// styles/PaymentScreen.styles.ts

import { StyleSheet } from 'react-native';

/**
 * PaymentScreen Component Styles
 */
export const styles = StyleSheet.create({
  // ============================================================================
  // Container
  // ============================================================================
  
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  content: {
    padding: 20,
    paddingTop: 50,
  },

  // ============================================================================
  // Header
  // ============================================================================
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  backButton: {
    padding: 5,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },

  placeholder: {
    width: 38,
  },

  // ============================================================================
  // Map
  // ============================================================================
  
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  map: {
    flex: 1,
  },

  // ============================================================================
  // Delivery Info
  // ============================================================================
  
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  deliveryLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },

  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  deliveryTime: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27AE60',
  },

  // ============================================================================
  // Order Summary
  // ============================================================================
  
  orderSummary: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },

  quantityText: {
    fontSize: 14,
    color: '#7F8C8D',
  },

  // ============================================================================
  // Price Breakdown
  // ============================================================================
  
  totalsContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  priceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },

  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },

  priceLabelDiscount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
  },

  priceValueDiscount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
  },

  // ============================================================================
  // Payment Methods
  // ============================================================================
  
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },

  paymentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    gap: 8,
  },

  paymentButtonDark: {
    backgroundColor: '#2C2C2C',
  },

  paymentButtonActive: {
    borderWidth: 3,
    borderColor: '#1B5E20',
  },

  paymentButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666',
  },

  paymentButtonTextActive: {
    color: '#000',
  },

  paymentButtonTextWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },

  // ============================================================================
  // Proceed Button
  // ============================================================================
  
  proceedButton: {
    backgroundColor: '#1B5E20',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 25,
    marginBottom: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  proceedButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },

  proceedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});