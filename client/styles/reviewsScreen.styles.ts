/**
 * Styles
 * Adjusted to match the provided mockup image.
 */
import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
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
  divider: {
    width: "85%",
    height: 2,
    backgroundColor: "#000",
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: "center",
  },

  dropdown: {
    backgroundColor: "#E7EBDF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 15,
    paddingHorizontal: 50,
    paddingVertical: 6,
    alignSelf: "center",
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  noReviewsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    padding: 20,
  },
  reviewCardContainer: {
    marginBottom: 25,
    marginTop: 25,
    position: 'relative',
  },

  starsAbsolute: {
    position: 'absolute',
    top: -25,
    left: 10,
    flexDirection: 'row',
    zIndex: 10,
    
  },

  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: "#A6B89F",
    borderRadius: 16,
    paddingTop: 20,
    
    elevation: 3,
  },

  starsRow: {
    flexDirection: "row",
  },
  reviewContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "600",
    fontSize: 18,
    color: "#222",
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
  reviewButton: {
    backgroundColor: "#778959",
    borderColor: "#ffffffff",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
    top: -60,
    left: 25,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  inputContainer: {
    position: "absolute",
    width: 350,
    height: 55,
    left: 30,
    right: 0,
    bottom: 90,
    backgroundColor: "#e7ebdf",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
    borderWidth: 2,
    borderColor: "#000000ff",
    paddingHorizontal: 16,
    paddingVertical: -12,
    marginBottom: 20,
    borderRadius: 30,
    zIndex: 100,
  },

  // Dropdown list styles 
  dropdownList: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 16,
    maxHeight: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    position: 'relative',
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFF",
  },

  dropdownItemText: {
    fontSize: 15,
    color: "#333",
  },

  reviewsListContainer: {
    paddingBottom: 180,
  },

  reviewsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 50,
    pointerEvents: 'none',
  },
});