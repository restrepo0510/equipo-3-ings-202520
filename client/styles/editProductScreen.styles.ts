// styles/EditProductScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '500',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 40,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },

  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginBottom: 20,
  },

  // Form
  formTitle: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 20,
    marginBottom: 30,
  },

  inputGroup: {
    marginHorizontal: 20,
    marginBottom: 25,
  },

  label: {
    fontSize: 22,
    fontWeight: '600',
    color: '#004226',
    marginBottom: 10,
    marginLeft: 5,
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#161616',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  textArea: {
    borderRadius: 20,
    minHeight: 100,
    paddingTop: 15,
    textAlignVertical: 'top',
  },

  // Image and Price Row
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    gap: 20,
  },

  imageSection: {
    flex: 1,
  },

  imageText: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#004226',
    marginBottom: 10,
    marginLeft: 5,
    textAlign: 'center',
  },

  imageContainer: {
    width: 170,
    height: 170,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 12,
    color: '#BDC3C7',
    textAlign: 'center',
  },

  galleryButton: {
    position: 'absolute',
    right: -40,
    bottom: -28,
    marginTop: 15,
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Price Section
  priceSection: {
    flex: 1,
  },

  priceInput: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  deleteButtonCircle: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#C0392B',
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  saveButtonCircle: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#145625',
    backgroundColor: '#DCE4D0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },
});