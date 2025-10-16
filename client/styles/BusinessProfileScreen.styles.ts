import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 120,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000',
  },
  yummi: {
    fontStyle: 'italic',
    fontWeight: '400',
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -4,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: 20,
  },

  // Company Section
  companySection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 16,
  },
  companyImageContainer: {
    position: 'relative',
  },
  companyImage: {
    width: 64,
    height: 64,
    backgroundColor: '#1F2937',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyEmoji: {
    fontSize: 32,
  },
  editCompanyButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    backgroundColor: '#27AE60',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  // Products List
  productsList: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Product Card
  productCard: {
    position: 'relative',
    marginBottom: 12,
  },
  quantityBadge: {
    position: 'absolute',
    left: -12,
    top: 8,
    width: 32,
    height: 32,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  editButton: {
    position: 'absolute',
    right: -12,
    top: 8,
    width: 36,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  deleteButton: {
    position: 'absolute',
    right: -12,
    bottom: 8,
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FEE2E2',
  },
  productCardInner: {
    backgroundColor: '#166534',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 4,
    borderColor: '#14532D',
  },
  productImageContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#FFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.9,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 12,
    color: '#FFF',
    fontStyle: 'italic',
    opacity: 0.8,
  },

  // Quantity Controls
  quantityControls: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FCA5A5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonAdd: {
    backgroundColor: '#FFF',
  },

  // Loading/Error States
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#27AE60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  // Logout Button
    logoutButton: {
        backgroundColor: '#E74C3C',
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});