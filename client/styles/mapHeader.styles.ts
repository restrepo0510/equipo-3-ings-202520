// styles/MapHeader.styles.ts

import { StyleSheet } from 'react-native';
import { MAP_HEADER } from '@/constants/map.constants';

/**
 * MapHeader Component Styles
 */
export const mapHeaderStyles = StyleSheet.create({
  /**
   * Container positioned at top of map
   */
  container: {
    position: 'absolute',
    top: MAP_HEADER.PADDING_TOP,
    left: MAP_HEADER.PADDING_HORIZONTAL,
    right: MAP_HEADER.PADDING_HORIZONTAL,
    zIndex: 10,
  },

  /**
   * White card containing header elements
   */
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: MAP_HEADER.BORDER_RADIUS,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  /**
   * Back button on the left
   */
  backButton: {
    padding: 4,
  },

  /**
   * Title text in the center
   */
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 12,
  },

  /**
   * Center location button on the right
   */
  centerButton: {
    padding: 4,
  },
});