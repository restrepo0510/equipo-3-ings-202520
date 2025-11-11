// styles/FavoritesScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
   yummi: {
        fontStyle: "italic",
        fontWeight: "200",
        letterSpacing: 4,
        fontSize: 28,
        margin: 2,
        color: "#4A4A4A",
    },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  headerSpacer: {
    width: 40,
  },
   divider: {
        width: "80%",
        height: 2,
        backgroundColor: "#000",
        marginBottom: 20,
        borderRadius: 20,
        alignSelf: "center",
    },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7F8C8D',
  },
 
  productCard: {
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    marginRight: 16,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    marginRight: -10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  priceContainer: {
    flexShrink: 0,
    position: 'relative',
    top: -45,
    right: -25,
  },
  priceTag: {
    backgroundColor: '#778959',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ffffff',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unavailableTag: {
    backgroundColor: '#E74C3C',
     paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ffffff',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
  },
  unavailableText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heartButton: {
    position: 'absolute',
    top: 60,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 6,
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',

  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});