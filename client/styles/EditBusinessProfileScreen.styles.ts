// styles/EditBusinessProfileScreen.styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7F8C8D',
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
  yummi: {
    fontStyle: 'italic',
    fontWeight: '400',
  },
  headerSubtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -4,
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginBottom: 20,
  },

 
  // Form
  form: {
    paddingHorizontal: 20,
  },

  inputGroup: {
    marginBottom: 20,
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
    borderColor: '#161616ff',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',

  },

  textArea: {
    minHeight: 80,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  hint: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 6,
    fontStyle: 'italic',
  },
  // Profile Picture
  profilePictureSection: {
    marginBottom: 30,
    alignItems: 'center',
  },

  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 10,
  },

  profileImageWrapper: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.2)',

  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },

  removeProfileImageButton: {
    position: 'absolute',
    top: 5,
    right: -10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    
  },

  changeProfileImageButton: {
    position: 'absolute',
    bottom: -10,
    right: -40,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    gap: 8,
   
  },

  changeProfileImageText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  // Row
  row: {
    flexDirection: 'row',
    gap: 12,
  },

  halfWidth: {
    flex: 1,
  },

  // Buttons
  saveButton: {
    flexDirection: 'row',
    width: '55%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004226',
    paddingVertical: 16,
    borderRadius: 60,
    marginTop: 20,
    gap: 8,
  },

  saveButtonDisabled: {
    backgroundColor: '#95A5A6',
  },

  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  cancelButton: {
    width: '30%',
    backgroundColor: '#bd4545ff',
    borderRadius: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
  },

  cancelButtonText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});