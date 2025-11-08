import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fffefeff" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#FFF",
  },
  backButton: { 
    marginRight: 12 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    color: "#000",
    letterSpacing: 1,
  },
  yummi: { 
    color: "#000",
    fontWeight: "700",
    fontStyle: "italic",
  },
  divider: {
    width: "90%",
    height: 2,
    left:20,
    backgroundColor: "#000",
    marginVertical: 10,
  },
  scrollContent: { 
    padding: 20,
    paddingBottom: 100,
  },
  section: { 
    marginBottom: 24 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 12,
    color: "#000",
  },
  
  // Dropdown de restaurante
   dropdownList: {
  backgroundColor: "#FFF",
  borderWidth: 2,
  borderColor: "#E0E0E0",
  borderRadius: 12,
  marginTop: 8,
  maxHeight: 250, // ← Altura fija con scroll
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
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
  // Card de producto
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
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
  
  // Estrellas
  starRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  
  // Input de reseña
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