import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#F5F1E8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
  },
  yummi: {
    fontWeight: "700",
    letterSpacing: 2,
  },
  scrollContent: {
    padding: 20,
  },
  reviewBox: {
    backgroundColor: "#FFF",
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
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginTop: 8,
  },
});
