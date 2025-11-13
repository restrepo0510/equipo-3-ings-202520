// addReviewScreen.styles.ts
// ============================================================
// 🎨 Add Review Screen Styles
// Styles for the screen where users can add a review and rate a product
// ============================================================

import { StyleSheet } from "react-native";

/**
 * Styles for AddReviewScreen — organized by functional sections:
 * Header, Dropdown, Product Card, Review Input, etc.
 */
export const profileStyles = StyleSheet.create({
  // ==========================
  // 🔹 Layout & Container
  // ==========================
  container: { 
    flex: 1, 
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingTop: 40,
    alignContent: "center",
  },

  scrollContent: { 
    padding: 10,
    paddingBottom: 100,
  },

  // ==========================
  // 🔹 Header Section
  // ==========================
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

  // Divider line used between header and main content
  divider: {
    width: "85%",
    height: 2,
    backgroundColor: "#000",
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: "center",
  },

  // ==========================
  // 🔹 Sections & Titles
  // ==========================
  section: { 
    marginBottom: 24, 
    marginTop: -15,
  },

  sectionTitle: { 
    fontSize: 28, 
    fontWeight: "700", 
    marginBottom: 18,
    color: "#000",
    alignSelf: "center",
  },

  sectionSubTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 18,
    color: "#000",
  },

  // ==========================
  // 🔹 Dropdown Menu
  // ==========================
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

  dropdownList: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 15,
    marginTop: 8,
    marginBottom: 20,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    position: "relative",
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

  // ==========================
  // 🔹 Product Card
  // ==========================
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#A6B89F",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.1)",
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

  // ==========================
  // 🔹 Rating Stars
  // ==========================
  starRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },

  // ==========================
  // 🔹 Review Input
  // ==========================
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  input: { 
    flex: 1, 
    height: 40,
    fontSize: 15,
    color: "#333",
  },

  sendButton: {
    backgroundColor: "#000",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  emptyText: { 
    color: "#999", 
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
});
