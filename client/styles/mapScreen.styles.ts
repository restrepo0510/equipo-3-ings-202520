// styles/mapScreen.styles.ts

import { StyleSheet } from 'react-native';
import { MAP_CARD } from '@/constants/map.constants';

/**
 * MapScreen Component Styles
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
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },

  // ============================================================================
  // Map Styles
  // ============================================================================
  
  map: {
    flex: 1,
  },

  // ============================================================================
  // Loading & Error States
  // ============================================================================
  
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },

  errorText: {
    color: '#E74C3C',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },

  retryButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },

  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // ============================================================================
  // User Location Marker Styles
  // ============================================================================
  
  userMarkerOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 122, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  userMarkerInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },

  // ============================================================================
  // Restaurant Card Styles
  // ============================================================================
  
  restaurantCardContainer: {
    position: 'absolute',
    bottom: MAP_CARD.BOTTOM_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  restaurantCard: {
    width: MAP_CARD.WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: MAP_CARD.CARD_BORDER_RADIUS,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  restaurantImage: {
    width: MAP_CARD.IMAGE_SIZE,
    height: MAP_CARD.IMAGE_SIZE,
    borderRadius: MAP_CARD.IMAGE_BORDER_RADIUS,
    marginBottom: 6,
  },

  viewProductsButton: {
    backgroundColor: '#27AE60',
    borderRadius: MAP_CARD.BUTTON_BORDER_RADIUS,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    marginRight: 12,
  },

  viewProductsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 6,
  },

  // ✅ NUEVO: Estilos adicionales para la tarjeta
  restaurantAddress: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 8,
  },

  restaurantDistance: {
    fontSize: 11,
    color: '#27AE60',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },

  // ============================================================================
  // Style tokens for programmatic access
  // ============================================================================
  
  loader: {
    color: '#27AE60',
  },

  error: {
    color: '#E74C3C',
  },
});