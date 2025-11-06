// app/(tabs)/ReadReviews.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createReviewsNavItems } from '@/utils/navigationHelpers';
import { ReviewsUtils } from '@/utils/reviews.utils';
import { 
  REVIEWS_TEXT, 
  REVIEWS_ICONS, 
  REVIEWS_CONSTANTS 
} from '@/constants/reviews.constants';
import { profileStyles as styles } from '@/styles/ReadReviews.styles';

/**
 * ReadReviews Component
 * 
 * Displays detailed view of a single review
 * 
 * @responsibilities
 * - Display review details
 * - Show product information
 * - Navigate to restaurant
 */
export default function ReadReviews(): React.ReactElement {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const navItems = createReviewsNavItems('reviews', router);

  // Extract review data from params
  const {
    namep,
    text,
    rating,
    productName,
    productDescription,
    productImage,
    restaurantId,
    restaurantName,
  } = params;

  // ============================================================================
  // Handlers
  // ============================================================================

  /**
   * Navigates to restaurant's products screen
   */
  const handleVisitRestaurant = (): void => {
    if (restaurantId) {
      router.push({
        pathname: '/(tabs)/ProductsScreen',
        params: {
          restaurantId: restaurantId as string,
          restaurantName: (restaurantName as string) || 'Restaurante',
        },
      });
    }
  };

  /**
   * Navigates back
   */
  const handleGoBack = (): void => {
    router.back();
  };

  // ============================================================================
  // Render Helpers
  // ============================================================================

  /**
   * Renders star rating display
   */
  const renderStars = (ratingValue: number): React.ReactElement => (
    <View style={styles.starsRow}>
      {ReviewsUtils.getStarIndices().map((star) => (
        <Ionicons
          key={star}
          name={ReviewsUtils.isStarFilled(star, Number(ratingValue)) 
            ? REVIEWS_ICONS.STAR_FILLED 
            : REVIEWS_ICONS.STAR_OUTLINE}
          size={REVIEWS_CONSTANTS.UI.STAR_SIZE_SMALL}
          color={REVIEWS_ICONS.COLOR.STAR}
        />
      ))}
    </View>
  );

  /**
   * Renders product card with restaurant link
   */
  const renderProductCard = (): React.ReactElement | null => {
    if (!productName) return null;

    const imageSource = ReviewsUtils.isValidImageUrl(productImage as string)
      ? { uri: productImage as string }
      : null;

    return (
      <View style={styles.productCard}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.productImage}
            onError={() => console.log('Image load error')}
          />
        )}
        
        <View style={styles.productInfo}>
          <Text style={styles.productName}>
            {productName as string}
          </Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {(productDescription as string) || REVIEWS_TEXT.READ_REVIEW.PRODUCT_DETAILS}
          </Text>
        </View>

        {restaurantId && (
          <TouchableOpacity 
            style={styles.visitButton} 
            onPress={handleVisitRestaurant}
            accessibilityLabel={REVIEWS_TEXT.READ_REVIEW.VISIT_RESTAURANT}
            accessibilityRole="button"
          >
            <Text style={styles.visitButtonText}>
              {REVIEWS_TEXT.READ_REVIEW.VISIT_RESTAURANT}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  /**
   * Renders review text box
   */
  const renderReviewBox = (): React.ReactElement => (
    <View style={styles.reviewBox}>
      <Text style={styles.reviewerName}>
        {(namep as string) || REVIEWS_TEXT.READ_REVIEW.ANONYMOUS_USER}
      </Text>
      <Text style={styles.reviewText}>
        {(text as string) || REVIEWS_TEXT.READ_REVIEW.NO_COMMENT}
      </Text>
    </View>
  );

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Rating */}
        {renderStars(Number(rating) || 0)}

        {/* Product Card */}
        {renderProductCard()}

        {/* Review Box */}
        {renderReviewBox()}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}