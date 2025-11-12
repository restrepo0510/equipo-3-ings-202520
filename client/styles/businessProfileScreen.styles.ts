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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  yummi: {
    fontStyle: 'italic',
    fontWeight: '400',
  },
  headerSubtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -4,
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginBottom: 20,
  },

  // Company Section
  companySection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 80,
    marginBottom: 24,
    gap: 16,
  },
  companyImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  companyImage: {
    width: 100,
    height: 100,
    backgroundColor: '#1F2937',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.3)',
    
  },
  companyEmoji: {
    fontSize: 32,
  },
  editCompanyButton: {
    position: 'absolute',
    bottom: -4,
    right: -15,
    width: 34,
    height: 34,
    backgroundColor: '#DCE4D0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  companyName: {
    fontSize: 30,
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
    top: -10,
    width: 40,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#FFF',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.3)',

  },
  quantityText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#374151',
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: -15,
    width: 46,
    height: 46,
    backgroundColor: '#DCE4D0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
    borderWidth: 2,
    borderColor: '#ffff',
  },
  
  productCardInner: {
    backgroundColor: '#556B2F',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#145625',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.2)',

  },
  productImageContainer: {
    width: 100,
    height: 100,
    margin: -4,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
    marginBottom: 10,
  },
  productPrice: {
    fontSize:18,
    color: '#FFF',
    fontWeight: 'semibold',
  },

  // Quantity Controls
  quantityControls: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 5,
    right:5,
  },
  quantityButton: {
    width: 46,
    height: 46,
    backgroundColor: '#FCA5A5',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#242a33ff',
    justifyContent: 'center',
    alignItems: 'center',

  },
  quantityButtonAdd: {
    backgroundColor: '#DCE4D0',
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
        position: 'relative',
        alignSelf: 'center',
        width: '30%',
        backgroundColor: '#d35446ff',
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 12,
        boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',

    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});