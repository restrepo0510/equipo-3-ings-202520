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
  white: '#FFFFFF',
  separator: '#0C1706',
  background: '#F8F9FA',
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    placeholder: '#95A5A6',
  },
  border: '#E7EBDF',
  search: '#E7EBDF',
  badge: {
    top: '#1B5E20',
  },
  shadow: '#000',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

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
    width: 140,
    height: 140,
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

  // Separator line
  underline: {
    height: 2,
    backgroundColor: COLORS.separator,
    width: 350,
    alignSelf: 'center',
    borderRadius: 2,
  },

  // Greeting section
  greetingContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
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

  // Grid section - Combinando ambas versiones
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
  
  // Circular logo at top center (del primer código)
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
  
  // Badge (category) - Manteniendo ambas posiciones
  badge: {
    position: 'absolute',
    top: 40, // Posición del primer código
    right: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 10,
    ...SHADOWS.small,
  },
  // Badge alternativo para la posición del segundo código
  badgeTop: {
    position: 'absolute',
    top: 12, // Posición del segundo código
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
  
  // Image with margins (del primer código)
  gridImageContainer: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  gridImage: {
    width: '100%',
    height: 140, // Del primer código
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  // Imagen alternativa para el segundo código
  gridImageFull: {
    width: '100%',
    height: 150, // Del segundo código
    backgroundColor: COLORS.border,
  },
  
  gridInfo: {
    paddingHorizontal: 12,
  },
  gridTitle: {
    fontSize: 15, // Del primer código
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  // Título alternativo para el segundo código
  gridTitleLarge: {
    fontSize: 16, // Del segundo código
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  topBadgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  topCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  topImage: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.border,
  },
  restaurantLogo: {
    position: 'absolute',
    top: 140,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  restaurantLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  topInfo: {
    padding: 16,
    paddingTop: 12,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
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

  // Bottom Navigation (del primer código)
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    ...SHADOWS.bottomNav,
  },
  navItem: {
    padding: 8,
  },
});