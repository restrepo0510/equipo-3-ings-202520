/**
 * Styles
 * Adjusted to match the provided mockup image.
 */
import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#1E1E1E",
  },
  yummi: {
    color: "#5B8A72",
    fontWeight: "700",
  },
  divider: {
        width: "90%",
        height: 2,
        backgroundColor: "#000",
        marginBottom: 20,
    },
     divider2: {
        width: "90%",
        height: 2,
        left:13,
        backgroundColor: "#000",
        marginBottom: 180,
        
    },
  dropdown: {
    backgroundColor:"#E7EBDF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 6,
    alignSelf: "center",
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  noReviewsText:{
    fontSize: 16,
    color: "#333",
  },
  reviewCardContainer: {
  marginBottom: 25,
  marginTop: 10,
  position: 'relative',
},

starsAbsolute: {
  position: 'absolute',
  top: -20,
  left: 10,
  flexDirection: 'row',
  zIndex: 10,
},

reviewCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderWidth: 1,
  borderColor: "#A6B89F",
  borderRadius: 12,
  paddingTop: 20, 
  elevation: 3,
},
 
  starsRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  reviewContent: {
    
    flexDirection: "row",
    alignItems: "center",
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "600",
    fontSize: 15,
    color: "#222",
  },
  reviewText: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
  reviewButton: {
    backgroundColor: "#778959",
    borderColor: "#ffffffff",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
    top:-35,
    left:15,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A6B89F",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  inputContainerFixed: {
    position: "absolute",
    width:350,
    left: 15,
    right: 0,
    bottom: 90,
    backgroundColor: "#e7ebdf",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
    borderWidth: 2,
    borderColor: "#000000ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 30
  },
  
  // Dropdown list styles
  dropdownList: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 16,
    maxHeight: 200,
  },
  
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#FFF",
  },
  
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  

});