import { StyleSheet } from "react-native";

export const editProfileStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 120, // Space for bottom nav
    alignItems: "center",
  },
  
  // Header
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1,
  },
  yummi: { 
    fontStyle: "italic",
    fontWeight: "300",
    letterSpacing: 2,
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: "#000",
    marginBottom: 20,
  },
  
  // Edit Profile Title
  editTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },

  // Profile Section
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBackground: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#2C3E2F",
  },
  profileImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 50,
    zIndex: 2,
  },
  
  // Decorative stars
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
  
  // Folder Button
  folderButton: {
    position: "absolute",
    right: -5,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 3,
  },

  // Form
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
  // Añade esto a los estilos existentes
imageHint: {
  fontSize: 12,
  color: '#7F8C8D',
  textAlign: 'center',
  marginTop: 8,
  fontStyle: 'italic',
},
// Save Button
saveButton: {
  backgroundColor: "#1B5E20",
  borderRadius: 25,
  paddingVertical: 14,
  paddingHorizontal: 40,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  alignSelf: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},

saveButtonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "bold",
  letterSpacing: 1,
},

});

