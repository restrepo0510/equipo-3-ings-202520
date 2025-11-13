// app/(tabs)/AddReviewScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/hooks/useLocation';
import { useReviewForm } from '@/hooks/useReviewForm';
import { useRestaurantProducts } from '@/hooks/useRestaurantProducts';
import { ReviewsUtils } from '@/utils/reviews.utils';
import { 
  REVIEWS_TEXT, 
  REVIEWS_ICONS, 
  REVIEWS_CONSTANTS 
} from '@/constants/reviews.constants';
import { profileStyles as styles } from '@/styles/addReviewScreen.styles';
import type { RestaurantSummary, ProductSummary } from '@/types/reviews.types';

/**
 * AddReviewScreen Component
 * 
 * Allows users to create and submit reviews for products.
 * 
 * Responsibilities:
 * - Render review creation form
 * - Handle restaurant and product selection
 * - Collect rating and review text
 * - Submit review
 */
export default function AddReviewScreen(): React.ReactElement {
  // ============================================================================
  // Hooks & State
  // ============================================================================
  
  const router = useRouter();
  const { token } = useAuth();
  const { location } = useLocation();
  const navItems = createNavItems('reviews', router);

  // Review form state management
  const {
    selectedRestaurant,
    selectedProduct,
    rating,
    reviewText,
    isSubmitting,
    setSelectedRestaurant,
    setSelectedProduct,
    setRating,
    setReviewText,
    validateAndSubmit,
    resetForm,
  } = useReviewForm();

  // Restaurant and products fetching
  const {
    restaurants,
    products,
    isLoadingRestaurants,
    isLoadingProducts,
    loadProducts,
  } = useRestaurantProducts(location, token);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Loads products when a restaurant is selected
   */
  useEffect(() => {
    if (selectedRestaurant) {
      loadProducts(selectedRestaurant.id);
    }
  }, [selectedRestaurant, loadProducts]);

  // ============================================================================
  // Handlers
  // ============================================================================

  /** Handles restaurant selection */
  const handleSelectRestaurant = (restaurant: RestaurantSummary): void => {
    setSelectedRestaurant(restaurant);
    setSelectedProduct(null);
    setDropdownVisible(false);
  };

  /** Handles product selection */
  const handleSelectProduct = (product: ProductSummary): void => {
    setSelectedProduct(product);
  };

  /** Handles star rating selection */
  const handleSelectRating = (star: number): void => {
    setRating(star);
  };

  /** Handles review submission */
  const handleSubmit = async (): Promise<void> => {
    await validateAndSubmit(token!, () => {
      resetForm();
      router.push('/(tabs)/ReviewsScreen');
    });
  };

  /** Handles navigation back */
  const handleGoBack = (): void => {
    router.back();
  };

  /** Toggles dropdown visibility */
  const toggleDropdown = (): void => {
    if (!isLoadingRestaurants) {
      setDropdownVisible(!dropdownVisible);
    }
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /** Renders star rating selector */
  const renderStarRating = (): React.ReactElement => (
    <View style={styles.starRow}>
      {ReviewsUtils.getStarIndices().map((star) => (
        <TouchableOpacity 
          key={star} 
          onPress={() => handleSelectRating(star)}
          disabled={isSubmitting}
          accessibilityLabel={`${star} ${REVIEWS_TEXT.ACCESSIBILITY.STAR_RATING}`}
          accessibilityRole="button"
        >
          <Ionicons
            name={ReviewsUtils.isStarFilled(star, rating) 
              ? REVIEWS_ICONS.STAR_FILLED 
              : REVIEWS_ICONS.STAR_OUTLINE}
            size={REVIEWS_CONSTANTS.UI.STAR_SIZE}
            color={REVIEWS_ICONS.COLOR.STAR}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  /** Renders restaurant dropdown selector */
  const renderRestaurantDropdown = (): React.ReactElement => (
    <>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={toggleDropdown}
        disabled={isLoadingRestaurants}
        accessibilityLabel={REVIEWS_TEXT.ACCESSIBILITY.SELECT_RESTAURANT}
        accessibilityRole="button"
      >
        <Text style={styles.dropdownText}>
          {selectedRestaurant 
            ? selectedRestaurant.name 
            : REVIEWS_TEXT.ADD_REVIEW.RESTAURANT_PLACEHOLDER}
        </Text>
        <Ionicons
          name={dropdownVisible ? REVIEWS_ICONS.CHEVRON_UP : REVIEWS_ICONS.CHEVRON_DOWN}
          size={REVIEWS_ICONS.SIZE.MEDIUM}
          color={REVIEWS_ICONS.COLOR.SECONDARY}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <ScrollView 
          style={styles.dropdownList} 
          nestedScrollEnabled
          showsVerticalScrollIndicator
        >
          {isLoadingRestaurants ? (
            <ActivityIndicator 
              size="small" 
              color={REVIEWS_ICONS.COLOR.PRIMARY} 
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
            <Text style={styles.emptyText}>
              {REVIEWS_TEXT.EMPTY.NO_RESTAURANTS}
            </Text>
          )}
        </ScrollView>
      )}
    </>
  );

  /** Renders product selection list */
  const renderProductSelection = (): React.ReactElement | null => {
    if (!selectedRestaurant) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionSubTitle}>
          {REVIEWS_TEXT.ADD_REVIEW.SELECT_PRODUCT}
        </Text>
        
        {isLoadingProducts ? (
          <ActivityIndicator 
            size="small" 
            color={REVIEWS_ICONS.COLOR.PRIMARY} 
          />
        ) : products.length > 0 ? (
          products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                selectedProduct?.id === product.id && {
                  borderColor: REVIEWS_ICONS.COLOR.PRIMARY,
                  backgroundColor: '#F8F8F8',
                },
              ]}
              onPress={() => handleSelectProduct(product)}
              accessibilityLabel={REVIEWS_TEXT.ACCESSIBILITY.SELECT_PRODUCT}
              accessibilityRole="button"
            >
              <Image
                source={{ 
                  uri: ReviewsUtils.getProductImageSource(product.imageUrl) 
                }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text numberOfLines={2} style={styles.productDescription}>
                  {product.description || REVIEWS_TEXT.READ_REVIEW.PRODUCT_DETAILS}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>
            {REVIEWS_TEXT.EMPTY.NO_PRODUCTS}
          </Text>
        )}
      </View>
    );
  };

  /** Renders review input and submission button */
  const renderReviewInput = (): React.ReactElement | null => {
    if (!selectedProduct) return null;

    return (
      <>
        <View style={styles.section}>
          <Text style={styles.sectionSubTitle}>
            {REVIEWS_TEXT.ADD_REVIEW.RATE_AND_REVIEW}
          </Text>
          {renderStarRating()}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={REVIEWS_TEXT.ADD_REVIEW.WRITE_REVIEW}
            placeholderTextColor="#999"
            value={reviewText}
            onChangeText={setReviewText}
            style={styles.input}
            editable={!isSubmitting}
            multiline
            maxLength={REVIEWS_CONSTANTS.VALIDATION.MAX_REVIEW_LENGTH}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSubmit}
            disabled={isSubmitting}
            accessibilityLabel={REVIEWS_TEXT.ACCESSIBILITY.SUBMIT_REVIEW}
            accessibilityRole="button"
          >
            {isSubmitting ? (
              <ActivityIndicator 
                color={REVIEWS_ICONS.COLOR.WHITE} 
                size="small" 
              />
            ) : (
              <Ionicons 
                name={REVIEWS_ICONS.SEND} 
                size={REVIEWS_ICONS.SIZE.MEDIUM} 
                color={REVIEWS_ICONS.COLOR.WHITE} 
              />
            )}
          </TouchableOpacity>
        </View>
      </>
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleGoBack} 
          style={styles.backButton}
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Restaurant Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {REVIEWS_TEXT.ADD_REVIEW.ADD_REVIEW_TITLE}
          </Text>
          <Text style={styles.sectionSubTitle}>
            {REVIEWS_TEXT.ADD_REVIEW.SELECT_RESTAURANT}
          </Text>
          {renderRestaurantDropdown()}
        </View>

        {/* Product Selection */}
        {renderProductSelection()}

        {/* Rating & Review */}
        {renderReviewInput()}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}
