// app/(tabs)/ReviewsScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createReviewsNavItems } from '@/utils/navigationHelpers';
import { useAuth } from '@/context/AuthContext';
import { useRestaurants } from '@/context/RestaurantsContext';
import { useLocation } from '@/hooks/useLocation';
import { useReviewsList } from '@/hooks/useReviewsList';
import { useRestaurantProducts } from '@/hooks/useRestaurantProducts';
import { ReviewsUtils } from '@/utils/reviews.utils';
import { 
  REVIEWS_TEXT, 
  REVIEWS_ICONS, 
  REVIEWS_CONSTANTS 
} from '@/constants/reviews.constants';
import { profileStyles as styles } from '@/styles/ReviewsScreen.styles';
import type { RestaurantSummary, FormattedReview } from '@/types/reviews.types';

/**
 * ReviewsScreen Component
 * 
 * Displays list of reviews with restaurant filtering
 * 
 * @responsibilities
 * - Display reviews list
 * - Filter by restaurant
 * - Navigate to review details
 * - Navigate to add review
 */
export default function ReviewsScreen(): React.ReactElement {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const router = useRouter();
  const { token } = useAuth();
  const { location } = useLocation();
  const { restaurants: globalRestaurants, setRestaurants: setGlobalRestaurants } = useRestaurants();
  const navItems = createReviewsNavItems('reviews', router);

  // Restaurant loading
  const {
    restaurants: localRestaurants,
    isLoadingRestaurants,
  } = useRestaurantProducts(location, token);

  // Reviews loading and filtering
  const {
    displayedReviews,
    allReviews,
    isLoading: loadingReviews,
    loadAllReviews,
    loadReviewsByRestaurant,
    showRandomReviews,
  } = useReviewsList(token);

  // Local UI state
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>(
    REVIEWS_TEXT.LIST.SELECT_RESTAURANT
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Sync local restaurants with global context
   */
  useEffect(() => {
    if (globalRestaurants.length > 0) {
      // Use global restaurants if available
      return;
    }

    if (localRestaurants.length > 0) {
      setGlobalRestaurants(localRestaurants);
    }
  }, [localRestaurants, globalRestaurants.length, setGlobalRestaurants]);

  /**
   * Load all reviews when restaurants are available
   */
  useEffect(() => {
    const restaurants = globalRestaurants.length > 0 
      ? globalRestaurants 
      : localRestaurants;

    if (restaurants.length > 0 && token) {
      loadAllReviews(restaurants);
    }
  }, [localRestaurants, globalRestaurants, token, loadAllReviews]);

  /**
   * Filter reviews when restaurant selection changes
   */
  useEffect(() => {
    if (selectedRestaurant === REVIEWS_TEXT.LIST.SELECT_RESTAURANT) {
      showRandomReviews(REVIEWS_CONSTANTS.UI.DEFAULT_VISIBLE_REVIEWS);
      return;
    }

    const restaurants = globalRestaurants.length > 0 
      ? globalRestaurants 
      : localRestaurants;
    
    const restaurant = restaurants.find(r => r.name === selectedRestaurant);
    
    if (restaurant) {
      loadReviewsByRestaurant(restaurant.id);
    }
  }, [selectedRestaurant, globalRestaurants, localRestaurants]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Handles restaurant selection
   */
  const handleSelectRestaurant = (restaurant: RestaurantSummary): void => {
    setSelectedRestaurant(restaurant.name);
    setDropdownVisible(false);
  };

  /**
   * Navigates to review details
   */
  const handleViewReview = (review: FormattedReview): void => {
    router.push({
      pathname: '/(tabs)/ReadReviews',
      params: {
        id: review.id,
        namep: review.namep,
        text: review.text,
        rating: review.rating,
        productName: review.productName,
        productDescription: review.productDescription,
        productImage: review.image?.uri || '',
        restaurantId: review.restaurantId,
        restaurantName: review.restaurantName,
      },
    });
  };

  /**
   * Navigates to add review screen
   */
  const handleAddReview = (): void => {
    router.push('/(tabs)/AddReviewScreen');
  };

  /**
   * Navigates back
   */
  const handleGoBack = (): void => {
    router.back();
  };

  /**
   * Toggles dropdown visibility
   */
  const toggleDropdown = (): void => {
    setDropdownVisible(!dropdownVisible);
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders star rating display
   */
  const renderStars = (rating: number): React.ReactElement => (
    <View style={styles.starsRow}>
      {ReviewsUtils.getStarIndices().map((star) => (
        <Ionicons
          key={star}
          name={ReviewsUtils.isStarFilled(star, rating) 
            ? REVIEWS_ICONS.STAR_FILLED 
            : REVIEWS_ICONS.STAR_OUTLINE}
          size={REVIEWS_CONSTANTS.UI.STAR_SIZE_MEDIUM}
          color={REVIEWS_ICONS.COLOR.STAR}
        />
      ))}
    </View>
  );

  /**
   * Renders a single review card
   */
const renderReviewCard = (review: FormattedReview): React.ReactElement => (
  <View key={review.id} style={styles.reviewCardContainer}>
    
    {/* Estrellas por encima del card */}
    <View style={styles.starsAbsolute}>
      {renderStars(review.rating)}
    </View>

    {/* Card */}
    <View style={styles.reviewCard}>
      <View style={styles.reviewContent}>
        {review.image && (
          <Image 
            source={{ uri: review.image.uri }}
            style={styles.foodImage}
          />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.reviewerName}>{review.namep}</Text>
          <Text style={styles.reviewText} numberOfLines={2}>
            {review.text}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => handleViewReview(review)}
        >
          <Text style={styles.reviewButtonText}>
            Ver reseña
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


  /**
   * Renders restaurant dropdown
   */
  const renderRestaurantDropdown = (): React.ReactElement => {
    const restaurants = globalRestaurants.length > 0 
      ? globalRestaurants 
      : localRestaurants;

    return (
      <>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={toggleDropdown}
          accessibilityLabel={REVIEWS_TEXT.ACCESSIBILITY.SELECT_RESTAURANT}
          accessibilityRole="button"
        >
          <Text style={styles.dropdownText}>{selectedRestaurant}</Text>
          <Ionicons
            name={dropdownVisible ? REVIEWS_ICONS.CHEVRON_UP : REVIEWS_ICONS.CHEVRON_DOWN}
            size={REVIEWS_ICONS.SIZE.SMALL}
            color={REVIEWS_ICONS.COLOR.SECONDARY}
          />
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdownList}>
            {isLoadingRestaurants ? (
              <ActivityIndicator 
                size="small" 
                color={REVIEWS_ICONS.COLOR.SUCCESS} 
                style={{ padding: 10 }} 
              />
            ) : restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectRestaurant(restaurant)}
                >
                  <Text style={styles.dropdownItemText}>{restaurant.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noReviewsText}>
                {REVIEWS_TEXT.EMPTY.NO_RESTAURANTS_AVAILABLE}
              </Text>
            )}
          </View>
        )}
      </>
    );
  };

  /**
   * Renders reviews list or empty state
   */
  const renderReviewsList = (): React.ReactElement => {
    if (loadingReviews) {
      return (
        <ActivityIndicator 
          size="large" 
          color={REVIEWS_ICONS.COLOR.SUCCESS} 
          style={{ marginTop: 20 }} 
        />
      );
    }

    if (displayedReviews.length === 0) {
      return (
        <Text style={styles.noReviewsText}>
          {selectedRestaurant === REVIEWS_TEXT.LIST.SELECT_RESTAURANT
            ? REVIEWS_TEXT.LIST.NO_REVIEWS
            : REVIEWS_TEXT.LIST.NO_RESTAURANT_REVIEWS}
        </Text>
      );
    }

    return <>{displayedReviews.map(renderReviewCard)}</>;
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleGoBack}
            accessibilityLabel={REVIEWS_TEXT.ACCESSIBILITY.BACK_BUTTON}
            accessibilityRole="button"
          >
            <Ionicons 
              name={REVIEWS_ICONS.BACK} 
              size={REVIEWS_ICONS.SIZE.LARGE} 
              color={REVIEWS_ICONS.COLOR.PRIMARY} 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            <Text style={styles.yummi}>{REVIEWS_TEXT.HEADER.TITLE} </Text>
            {REVIEWS_TEXT.HEADER.SUBTITLE}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Restaurant Filter */}
        {renderRestaurantDropdown()}


        {/* Reviews List */}
        {renderReviewsList()}
      </ScrollView>
<View style={styles.divider2} />


      {/* Add Review Input */}
      <View style={styles.inputContainerFixed}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={handleAddReview}
        >
          <TextInput
            placeholder={REVIEWS_TEXT.LIST.WRITE_OPINION}
            placeholderTextColor="#333"
            editable={false}
            style={styles.input}
          />
        </TouchableOpacity>
        <Ionicons 
          name={REVIEWS_ICONS.SEND} 
          size={REVIEWS_ICONS.SIZE.MEDIUM} 
          color={REVIEWS_ICONS.COLOR.PRIMARY} 
        />
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}