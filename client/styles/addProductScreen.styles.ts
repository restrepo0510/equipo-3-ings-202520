// styles/addProductScreen.styles.ts
// ============================================================
// 📘 Form Screen Styles
// Styles used for form screens with image picker and buttons.
// ============================================================

import { StyleSheet } from "react-native";

/**
 * Stylesheet for form-based screens.
 * Includes header, form controls, image picker, toggles, and action buttons.
 */
export const styles = StyleSheet.create({
  // ============================================================
  // 🔹 Layout & Scroll
  // ============================================================
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 120, // Space for bottom navigation
    alignItems: "center",
  },

  // ============================================================
  // 🔹 Header Section
  // ============================================================
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
  yummi: {
    color: "#27AE60",
    fontStyle: "italic",
    fontWeight: "300",
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: "#000",
    marginVertical: 20,
  },

  // ============================================================
  // 🔹 Form Elements
  // ============================================================
  form: {
    width: "85%",
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B5E20",
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  // ============================================================
  // 🔹 Image Picker
  // ============================================================
  imagePickerButton: {
    borderWidth: 3,
    borderColor: "#000",
    borderStyle: "dashed",
    borderRadius: 16,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  imagePickerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  // ============================================================
  // 🔹 Image Preview
  // ============================================================
  imagePreviewContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  changeImageButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#1B5E20",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  changeImageText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  // ============================================================
  // 🔹 Layout Utilities
  // ============================================================
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },

  // ============================================================
  // 🔹 Toggle Switch
  // ============================================================
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  toggle: {
    width: 60,
    height: 32,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    padding: 4,
  },
  toggleActive: {
    backgroundColor: "#27AE60",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
  },

  // ============================================================
  // 🔹 Buttons
  // ============================================================
  submitButton: {
    backgroundColor: "#1B5E20",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#FFF",
    borderColor: "#1B5E20",
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButtonText: {
    color: "#1B5E20",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
