// ✅ File: styles/editProfileScreen.styles.ts
// -------------------------------------------------------------
// This stylesheet defines the visual design for the Edit Profile Screen.
// It manages layout, headers, form fields, images, and button styles.
// Comments are in English for clarity, while visible text remains in Spanish.
// -------------------------------------------------------------

import { StyleSheet } from "react-native";

export const editProfileStyles = StyleSheet.create({

  // ======== MAIN CONTAINER ========
  container: { 
    flex: 1, 
    backgroundColor: "#FAFAFA",
  },

  scrollContent: {
    paddingTop: 60,
    paddingBottom: 120,
    alignItems: "center",
  },
  
  // ======== HEADER SECTION ========
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 24,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#1C2833",
    letterSpacing: 0.3,
  },

  yummi: {
    fontStyle: "italic",
    fontWeight: "300",
    letterSpacing: 3,
    color: "#2C3E50",
  },

  divider: {
    width: "85%",
    height: 2,
    backgroundColor: "#004226",
    marginVertical: 20,
    borderRadius: 10,
  },
  
  // ======== TITLE SECTION ========
  editTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#1C2833",
    marginBottom: 12,
  },

  // ======== PROFILE IMAGE SECTION ========
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  
  profileImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 100,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, 
    shadowRadius: 12, 
    elevation: 10, 
  },
  
  // --- Decorative Stars ---
  star1: {
    position: "absolute",
    top: 15,
    right: 10,
    zIndex: 3,
  },

  star2: {
    position: "absolute",
    bottom: 35,
    left: 5,
    zIndex: 3,
  },
  
  // ======== FOLDER BUTTON (Image Picker) ========
  folderButton: {
    position: "absolute",
    right: -35,
    bottom: 0,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },

  // ======== FORM SECTION ========
  form: {
    width: "85%",
    marginTop: -10,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 20,
    fontWeight: "700",
    color: "#145625",
    marginBottom: 8,
    marginLeft: 5,
    letterSpacing: 0.4,
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#C5C6C7",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#2C3E50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  // --- Input Error State ---
  inputError: {
    borderColor: "#E74C3C",
    borderWidth: 2,
    backgroundColor: "#FDEDEC",
    shadowColor: "#E74C3C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  // --- Error Text ---
  errorText: {
    color: "#E74C3C",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
    marginLeft: 12,
  },

  // --- Image Hint Text ---
  imageHint: {
    fontSize: 12,
    color: "#7F8C8D",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },

  // ======== SAVE BUTTON SECTION ========
  saveButton: {
    backgroundColor: "#004226",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },

  saveButtonDisabled: {
    backgroundColor: "#95A5A6",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  saveButtonTextDisabled: {
    color: "#ECF0F1",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
