// styles/OrderSummaryScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },

  // Timer
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    gap: 12,
  },

  timerContent: {
    flex: 1,
    alignItems: 'center',
  },

  timerText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 4,
  },

  timerCountdown: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
  },

  // Scroll Content
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  // Product Card
  productCard: {
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  productInfo: {
    flex: 1,
  },

  restaurantLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },

  restaurantNameText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },

  productNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },

  productDots: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 8,
    letterSpacing: 2,
  },

  productPriceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  productQuantity: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },

  originalPriceText: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  currentPriceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
  },

  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginLeft: 16,
    backgroundColor: '#FFF',
  },

  // Section
  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },

  // Restaurant Card
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  restaurantInfo: {
    flex: 1,
  },

  restaurantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },

  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },

  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },

  // Price Breakdown
  priceBreakdown: {
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    padding: 20,
  },

  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  priceLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },

  priceValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  priceLabelDiscount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },

  priceValueDiscount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  // Notes
  notesContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },

  cancelButton: {
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E74C3C',
  },

  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B5E20',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  payButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },

  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
