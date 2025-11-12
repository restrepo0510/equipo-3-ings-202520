// styles/ProfileScreens.styles.ts

import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContent: {
        paddingTop: 50,
        paddingBottom: 120,
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
        fontSize: 30,
        fontWeight: "700",
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
        width: "75%",
        height: 2,
        backgroundColor: "#000",
        marginBottom: 20,
        borderRadius: 20,
        alignSelf: "center",
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
        margin: 10,
        shadowColor: "#000",
    },

   profileImage: {
    width: 200,
    height: 200,
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
    // User Info
    name: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#000",
    },
    email: {
        fontSize: 16,
        color: "#555",
        marginTop: 4,
        fontWeight: "400",
    },
    phone: {
        fontSize: 16,
        color: "#555",
        marginTop: 2,
        fontWeight: "400",
    },

    // Role Badge
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#E8F5E9',
        borderRadius: 20,
    },
    roleText: {
        fontSize: 14,
        color: '#27AE60',
        fontWeight: '600',
    },

    // Image Loading & Fallback
    imageLoadingOverlay: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    initialsContainer: {
        backgroundColor: '#27AE60',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    
    // Decorative stars
    star1: {
        position: "absolute",
        top: 20,
        right: 25,
        zIndex: 4,
    },
    star2: {
        position: "absolute",
        top: 50,
        right: 5,
        zIndex: 4,
    },
    star3: {
        position: "absolute",
        bottom: 40,
        left: 15,
        zIndex: 4,
    },

    // Edit Button
    editButton: {
        position: "absolute",
        right: -20,
        bottom: -5,
        backgroundColor: "#DCE4D0",
        borderRadius: 25,
        borderWidth: 3,
        borderColor: "#FFFFFF",
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 7,
        zIndex: 3,
    },
purchaseCard: {
  flexDirection: "row",
  alignItems: "flex-start",
  backgroundColor: "#ffffff",
  borderRadius: 20,
  padding: 16,
  marginTop: 10,
  marginHorizontal: 20,
  

},

foodImageContainer: {
  backgroundColor: "#0B573E",
  borderRadius: 15,
  padding: 8,
  alignItems: "center",
  justifyContent: "center",
  width: 180,   
  minHeight: 20,
  marginRight: 14,
  shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5, 
    },
    shadowOpacity: 0.5, 
    shadowRadius: 5, 
    elevation: 12, 
},

foodImage: {
  width: 160,
  height: 175,
  borderRadius: 12,
  marginBottom: 15,
  backgroundColor: "#FFFFFF",
},

lastPurchaseLabel: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "700",
  textAlign: "center",
  letterSpacing: 0.3,
},

commentSection: {
  flex: 1,
  justifyContent: "flex-start",
  paddingTop: 4,
},

commentTitle: {
  fontSize: 24,
  textAlign: "center",
  fontWeight: "700",
  color: "#0B573E",
  marginBottom: 6,
  
},

commentText: {
    margin: 4,
  fontSize: 16,
  color: "#4A4A4A",
    textAlign: "justify",
  lineHeight: 18    ,
  letterSpacing: 0.2,
},

    // Logout Button
    logoutButton: {
        backgroundColor: '#E74C3C',
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Form Styles (for EditProfileScreen)
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
    editTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 20,
    },
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
});