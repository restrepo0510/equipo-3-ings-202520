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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },

  backButton: {
    marginRight: 20,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    marginBottom: 30,
  },

  // Form
  formTitle: {
    fontSize: 28,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#000',
  },

  textArea: {
    borderRadius: 20,
    minHeight: 100,
    paddingTop: 15,
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

  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E0E0E0',
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

  galleryButton: {
    marginTop: 15,
    width: 50,
    height: 50,
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
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  deleteButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  saveButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});