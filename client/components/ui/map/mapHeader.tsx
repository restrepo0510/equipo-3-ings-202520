// components/ui/map/MapHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mapHeaderStyles as styles } from '@/styles/mapHeader.styles';
import { MAP_TEXT, MAP_HEADER } from '@/constants/map.constants';

/**
 * MapHeader Props
 */
interface MapHeaderProps {
  /** Header title text */
  title: string;
  
  /** Callback for back button press */
  onBackPress: () => void;
  
  /** Callback for center location button press */
  onCenterPress: () => void;
}

/**
 * MapHeader Component
 * 
 * Header overlay for map screen with back and center buttons
 * Styled like the image reference with rounded white background
 * 
 * @param props - Component props
 * @returns MapHeader component
 */
export const MapHeader: React.FC<MapHeaderProps> = ({
  title,
  onBackPress,
  onCenterPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          accessibilityLabel={MAP_TEXT.ACCESSIBILITY.BACK_BUTTON}
          accessibilityRole="button"
        >
          <Ionicons 
            name="arrow-back" 
            size={MAP_HEADER.ICON_SIZE.BACK} 
            color="#000" 
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {/* Center Location Button */}
        <TouchableOpacity
          style={styles.centerButton}
          onPress={onCenterPress}
          accessibilityLabel={MAP_TEXT.ACCESSIBILITY.CENTER_BUTTON}
          accessibilityRole="button"
        >
          <Ionicons 
            name="locate" 
            size={MAP_HEADER.ICON_SIZE.CENTER} 
            color="#000" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};