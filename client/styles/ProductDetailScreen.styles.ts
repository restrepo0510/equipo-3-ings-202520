// styles/ProductDetailScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollContent: {
    paddingBottom: 180,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  // Product Image
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#FFF',
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  discountText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Info Container
  infoContainer: {
    backgroundColor: '#FFF',
    marginTop: 12,
    padding: 20,
  },

  restaurantTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },

  restaurantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
  },

  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },

  category: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
    marginBottom: 16,
  },

  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },

  stockText: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
  },

  stockTextLow: {
    color: '#E74C3C',
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },

  // Quantity Section
  quantitySection: {
    marginBottom: 24,
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtonDisabled: {
    backgroundColor: '#F9F9F9',
  },

  quantityText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    minWidth: 40,
    textAlign: 'center',
  },

  // Price Section
  priceSection: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  priceLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },

  priceValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  originalPrice: {
    fontSize: 14,
    color: '#95A5A6',
    textDecorationLine: 'line-through',
  },

  currentPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },

  priceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },

  priceLabelDiscount: {
    fontSize: 14,
    color: '#27AE60',
  },

  priceValueDiscount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27AE60',
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },

  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#27AE60',
  },

  // Address Section
  addressSection: {
    marginBottom: 20,
  },

  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0F9F4',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27AE60',
  },

  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },

  reserveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AE60',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },

  reserveButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },

  reserveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});