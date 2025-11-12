// ReadReviews.styles.ts
import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  
  // Header - ✅ Mismo estilo que ReviewsScreen
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  
  backButton: {
    marginRight: 0,
  },
  
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  
  yummi: {
    fontStyle: "italic",
    fontWeight: "200",
    letterSpacing: 4,
    color: "#4A4A4A",
  },
  
  // Divider - ✅ Mismo estilo que ReviewsScreen
  divider: {
    width: "85%",
    height: 2,
    backgroundColor: "#000",
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#A6B89F",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  visitButton: {
    position: "absolute",
    top: -15,
    right: -10,
    backgroundColor: "#778959",
    borderColor: "#ffffffff",
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  visitButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewBox: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#A6B89F",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewerName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
    // Star row container
  starsRow: {
    flexDirection: "row",
    marginBottom: 8,
    marginLeft: 8,
  },
});