import { StyleSheet } from "react-native";
export const profileStyles = StyleSheet.create({
 container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
    backButton: { marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#000" },
  yummi: { color: "#27AE60" },
  scrollContent: { padding: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
   dropdownText: { fontSize: 14, color: "#333" },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
 
input: { flex: 1, height: 40 },
  sendButton: {
    backgroundColor: "#27AE60",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  emptyText: { color: "#777", fontStyle: "italic" },
 
   productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productDescription: {
    fontSize: 13,
    color: "#555",
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  
  starRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 30,
  },
 
});
