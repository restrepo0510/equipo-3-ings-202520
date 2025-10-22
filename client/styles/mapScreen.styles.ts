// styles/mapScreen.styles.ts

import { StyleSheet } from 'react-native';
import { COLORS } from './homeScreen.styles';
import { RESTAURANT_CARD, CARD_POSITION } from '../constants/mapScreen.constants';

/**
 * Styles for MapScreen component
 */

export const mapStyles = StyleSheet.create({
  // ============================================================================
  // Container Styles
  // ============================================================================
  
  container: {
    flex: 1,
  },
  

  /**
   * Centered container for loading and error states
   */
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  // ============================================================================
  // Map Styles
  // ============================================================================
  
  map: {
    flex: 1,
  },

  // ============================================================================
  // User Location Marker Styles
  // ============================================================================
  
  /**
   * Outer circle of user location marker (translucent blue)
   */
  userMarkerOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /**
   * Inner circle of user location marker (solid color)
   */
  userMarkerInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryDark,
  },

  // ============================================================================
  // Restaurant Card Styles
  // ============================================================================
  
  /**
   * Container for restaurant info card
   * Positioned at bottom of screen
   */
  restaurantCardContainer: {
    position: 'absolute',
    bottom: CARD_POSITION.BOTTOM_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  /**
   * Restaurant info card
   */
  restaurantCard: {
    width: RESTAURANT_CARD.WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: RESTAURANT_CARD.CARD_BORDER_RADIUS,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  /**
   * Restaurant image (circular)
   */
  restaurantImage: {
    width: RESTAURANT_CARD.IMAGE_SIZE,
    height: RESTAURANT_CARD.IMAGE_SIZE,
    borderRadius: RESTAURANT_CARD.IMAGE_BORDER_RADIUS,
    marginBottom: 6,
  },

  /**
   * "View products" button
   */
  viewProductsButton: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: RESTAURANT_CARD.BUTTON_BORDER_RADIUS,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    marginRight: 12,
  },

  viewProductsButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },

  /**
   * Restaurant name text
   */
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 6,
  },

  // ============================================================================
  // Loading & Error States
  // ============================================================================
  
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.text.secondary,
  },

  errorText: {
    color: COLORS.error || '#E74C3C',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});