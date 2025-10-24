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

    // Profile Section
    profileSection: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImageContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    profileBackground: {
        position: "absolute",
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: "#2C3E2F",
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        zIndex: 2,
    },

    // User Info
    name: {
        fontWeight: "bold",
        fontSize: 24,
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
        right: 15,
        zIndex: 3,
    },
    star2: {
        position: "absolute",
        top: 50,
        right: 5,
        zIndex: 3,
    },
    star3: {
        position: "absolute",
        bottom: 40,
        left: 10,
        zIndex: 3,
    },

    // Edit Button
    editButton: {
        position: "absolute",
        right: 5,
        bottom: 5,
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

    // Purchase Card
    purchaseCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 16,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    foodImageContainer: {
        position: "relative",
    },
    foodImage: {
        width: 140,
        height: 180,
        borderRadius: 16,
        borderWidth: 4,
        borderColor: "#27AE60",
    },
    lastPurchaseLabel: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: "#1B5E20",
        color: "#FFFFFF",
        padding: 8,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 13,
    },

    // Comment Section
    commentSection: {
        flex: 1,
        marginLeft: 16,
        justifyContent: "flex-start",
        paddingTop: 40,
    },
    commentTitle: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
    commentText: {
        fontSize: 13,
        color: "#555",
        lineHeight: 20,
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