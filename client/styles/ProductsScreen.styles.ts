// styles/ProductsScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  // Loading & Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },

  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },

  retryButton: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
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

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 3,
  },

  divider: {
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  productCardDisabled: {
    opacity: 0.5,
  },

  productImageDisabled: {
    opacity: 0.6,
  },

  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },

  stockTextEmpty: {
    color: '#E74C3C',
    fontWeight: '600',
  },

  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },

  restaurantName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
  },

  // Section
  sectionTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7F8C8D',
    marginTop: 16,
    textAlign: 'center',
  },

  emptySubtext: {
    fontSize: 14,
    color: '#BDC3C7',
    marginTop: 8,
    textAlign: 'center',
  },

  // Products List
  productsList: {
    paddingHorizontal: 20,
    gap: 12,
  },

  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#A7B294',
    padding: 12,
    marginBottom: 12,
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    minHeight: 120,
  },

  // Product Image
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: '100%',
  },

  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  discountText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Product Info
  productInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingRight: 50,
  },

  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },

  productDescription: {
    fontSize: 13,
    color: '#7F8C8D',
    lineHeight: 18,
  },

  productCategory: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '600',
    marginTop: 4,
  },

  stockText: {
    fontSize: 12,
    color: '#95A5A6',
    fontStyle: 'italic',
  },

  // Price Badge - Ahora en la esquina superior derecha
  priceBadge: {
    position: 'absolute',
    top: -12,
    right: -8,
    backgroundColor: '#778959',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderColor: '#FFF',
    borderWidth: 2,
    minWidth: 70, 
    alignItems: 'center',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',

  },

  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },

  originalPrice: {
    fontSize: 10,
    color: '#FFF',
    textDecorationLine: 'line-through',
    opacity: 0.7,
    marginBottom: 2,
  },

  notAvailableBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },

  notAvailableText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },

  // Favorite Button - Ahora en la esquina inferior derecha
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: '#000000ff',
  },
});