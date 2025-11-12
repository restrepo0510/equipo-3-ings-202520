// styles/mapScreen.styles.ts

import { StyleSheet, Dimensions } from 'react-native';
import { MAP_CARD } from '@/constants/map.constants';

const { width } = Dimensions.get('window');

// Constantes para el card
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = 150;

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
  // Restaurant Card Styles - LAYOUT HORIZONTAL
  // ============================================================================
  
  restaurantCardContainer: {
    position: 'absolute',
    bottom: MAP_CARD.BOTTOM_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  restaurantCard: {
    flexDirection: 'row', // ← CAMBIO PRINCIPAL: Layout horizontal
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  // ==========================================
  // SECCIÓN IZQUIERDA: IMAGEN
  // ==========================================
  imageSection: {
    width: MAP_CARD.IMAGE_SIZE,
    height: MAP_CARD.IMAGE_SIZE,
    position: 'relative',
    marginLeft: 10,
  },

  restaurantImage: {
    width: '100%',
    height: '100%',
    borderRadius:100,
  },

  // ==========================================
  // SECCIÓN CENTRO: INFORMACIÓN
  // ==========================================
  infoSection: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },

  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },

  restaurantCategory: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 2,
  },

  restaurantAddress: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },

  restaurantDistance: {
    fontSize: 11,
    color: '#27AE60',
    fontWeight: '600',
  },

  // ==========================================
  // SECCIÓN DERECHA: BOTÓN FLECHA
  // ==========================================
  buttonSection: {
    position: 'absolute',
    right:-20 ,
    top:-12,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
    marginLeft:-20,
  },

  
  // ==========================================
  // ESTILOS LEGACY (mantener por compatibilidad)
  // ==========================================
  viewProductsButton: {
    backgroundColor: '#004226',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    marginRight: 12,
  },

  viewProductsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    
  },

  // ============================================================================
  // Style tokens for programmatic access
  // ============================================================================
  
  loader: {
    color: '#004226',
  },

  error: {
    color: '#E74C3C',
  },
});