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
        fontSize: 40,
        fontWeight: "900",
        color: "#000",
        letterSpacing: 0,
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
        marginBottom: 20,
        borderRadius: 20,
    },
  
  // Edit Profile Title
  editTitle: {
    fontSize: 35,
    fontWeight: "semibold",
    color: "#000",
    marginBottom: 10,
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
  
  profileImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 100,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12, 
    },
    shadowOpacity: 0.5, 
    shadowRadius: 20, 
    elevation: 20, 
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
    right: -35,
    bottom: 0,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },

  // Form
  form: {
    width: "85%",
    marginTop: -10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#000",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2, 
    },
    shadowOpacity: 0.5, 
    shadowRadius: 5, 
    elevation: 5, 
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

