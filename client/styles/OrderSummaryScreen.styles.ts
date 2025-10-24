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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
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
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },

  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },

  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },

  productQuantity: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  originalPriceText: {
    fontSize: 14,
    color: '#95A5A6',
    textDecorationLine: 'line-through',
  },

  currentPriceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27AE60',
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
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  priceLabel: {
    fontSize: 14,
    color: '#7F8C8D',
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

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
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
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E74C3C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E74C3C',
  },

  payButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27AE60',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },

  payButtonDisabled: {
    backgroundColor: '#BDC3C7',
  },

  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});