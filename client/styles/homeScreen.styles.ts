// styles/homeScreen.styles.ts

import { StyleSheet } from 'react-native';
import { CARD_WIDTH } from '../constants/homeScreen.constants';

/**
 * Color palette for the Home Screen
 */
export const COLORS = {
  primary: '#27AE60',
  primaryDark: '#1B3A2F',
  secondary: '#7F8C8D',
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    placeholder: '#95A5A6',
  },
  border: '#E8E8E8',
  search: '#E8EDF2',
  badge: {
    top: '#1B5E20',
  },
  shadow: '#000',
  error: '#E74C3C',
} as const;

/**
 * Shadow presets for consistent elevation
 */
const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  bottomNav: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Header section
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  underline: {
    height: 2,
    backgroundColor: '#0C1706',
    width: 350,
    alignSelf: 'center',
    borderRadius: 2,
  },
  
  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.search,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
  },

  // Greeting section
  greetingContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  greetingText: {
    fontSize: 24,
  },
  greetingBold: {
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  greetingName: {
    color: COLORS.text.secondary,
    fontWeight: '400',
  },

  // Grid section
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  gridCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  gridCardLeft: {
    paddingLeft: 8,
    paddingRight: 4,
  },
  gridCardRight: {
    paddingLeft: 4,
    paddingRight: 8,
  },
  gridCardInner: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 30, // Space for the logo
    paddingBottom: 16,
    ...SHADOWS.medium,
  },
  
  // Circular logo at top center
  gridLogoContainer: {
    position: 'absolute',
    top: -25,
    left: '50%',
    marginLeft: -30, // Half of logo width to center
    zIndex: 10,
  },
  gridLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.white,
    ...SHADOWS.medium,
  },
  
  // Badge (category)
  badge: {
    position: 'absolute',
    top: 40,
    right: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 10,
    ...SHADOWS.small,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.text.primary,
  },
  
  // Image with margins
  gridImageContainer: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  gridImage: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  
  gridInfo: {
    paddingHorizontal: 12,
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
  },

  // TOP 1 section
  topSection: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.badge.top,
    alignSelf: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: -15,
    marginLeft: 20,
    zIndex: 10,
    ...SHADOWS.medium,
  },
  topBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 8,
  },
  topCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'visible',
    paddingTop: 25,
    paddingBottom: 16,
    paddingHorizontal: 12,
    ...SHADOWS.large,
  },
  
  // Decorative leaves - Positioned like in the image
  topLeafLeft: {
    position: 'absolute',
    bottom: 20,
    left: -30,
    width: 80,
    height: 80,
    zIndex: 1,
    opacity: 0.9,
  },
  topLeafRight: {
    position: 'absolute',
    top: -10,
    right: -20,
    width: 90,
    height: 90,
    zIndex: 1,
    opacity: 0.9,
  },
  
  // Container for both images side by side
  topImagesRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 12,
  },
  
  // Main restaurant image (left side)
  topImageContainer: {
    flex: 1,
  },
  topImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  
  // Restaurant logo container (right side, square)
  topLogoContainer: {
    width: 180,
    height: 180,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  topLogoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  
  topInfo: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'right',
  },

  // List section
  moreSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.border,
  },
  listInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  listAddress: {
    fontSize: 13,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  listDistance: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
});