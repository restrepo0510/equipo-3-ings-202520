// styles/homeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { CARD_WIDTH } from '../constants/home.constants';

/**
 * 🎨 Color palette (exportable across the app)
 */
export const COLORS = {
  primary: '#27AE60',
  primaryDark: '#1B3A2F',
  secondary: '#7F8C8D',
  background: '#F8F9FA',
  white: '#FFFFFF',
  border: '#E8E8E8',
  shadow: '#000000',
  search: '#E8EDF2',
  error: '#E74C3C',
  badge: {
    top: '#1B5E20',
  },
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    placeholder: '#95A5A6',
  },
} as const;

/**
 * 🌫️ Shadow presets for elevation consistency
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
} as const;

/**
 * 📱 Spacing constants to maintain rhythm
 */
const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
} as const;

export const styles = StyleSheet.create({
  // ─── Main Container ────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ─── Header ────────────────────────────────────────
  header: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.large,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  underline: {
    height: 2,
    backgroundColor: COLORS.primaryDark,
    width: 350,
    alignSelf: 'center',
    borderRadius: 2,
  },

  // ─── Search Bar ────────────────────────────────────
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.search,
    marginHorizontal: SPACING.medium,
    marginTop: SPACING.medium,
    borderRadius: 25,
    paddingHorizontal: SPACING.medium,
    height: 50,
  },
  searchIcon: { marginRight: SPACING.small },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.primary,
  },

  // ─── Greeting Section ───────────────────────────────
  greetingContainer: {
    paddingHorizontal: SPACING.large,
    paddingVertical: SPACING.medium,
    alignSelf: 'center',
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

  // ─── Grid Section ──────────────────────────────────
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.small,
    alignSelf: 'center',
  },
  gridCard: {
    width: CARD_WIDTH,
    marginBottom: SPACING.medium,
  },
  gridCardInner: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: SPACING.medium,
    ...SHADOWS.medium,
  },

  gridLogoContainer: {
    position: 'absolute',
    top: -25,
    left: '50%',
    marginLeft: -30,
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

  // Badge
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

  // ─── Top Section ───────────────────────────────────
  topSection: {
    paddingHorizontal: SPACING.medium,
    marginVertical: SPACING.medium,
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
    marginLeft: SPACING.medium,
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
    paddingTop: 25,
    paddingBottom: 16,
    paddingHorizontal: 12,
    ...SHADOWS.large,
  },

  // ─── Decorative Elements ────────────────────────────
  topLeafLeft: {
    position: 'absolute',
    bottom: 20,
    left: -30,
    width: 80,
    height: 80,
    opacity: 0.9,
  },
  topLeafRight: {
    position: 'absolute',
    top: -10,
    right: -20,
    width: 90,
    height: 90,
    opacity: 0.9,
  },

  // ─── List Section ──────────────────────────────────
  moreSection: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: 100,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 12,
    padding: SPACING.medium,
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
    marginLeft: SPACING.medium,
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
});
