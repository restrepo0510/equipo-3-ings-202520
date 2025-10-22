// components/map/UserLocationMarker.tsx
import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { mapStyles } from '../../../styles/mapScreen.styles';

/**
 * Props for UserLocationMarker component
 */
interface UserLocationMarkerProps {
  /** User's latitude coordinate */
  latitude: number;
  /** User's longitude coordinate */
  longitude: number;
  /** Optional title for the marker callout */
  title?: string;
}

/**
 * UserLocationMarker Component
 *
 * Displays a custom marker for the user's current location on the map.
 * Uses a double-circle design: outer translucent circle and inner solid circle.
 * Properly anchored to prevent movement when map rotates.
 *
 * @example
 * ```tsx
 * <UserLocationMarker
 *   latitude={6.2442}
 *   longitude={-75.5812}
 *   title="Your location"
 * />
 * ```
 */
export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
  latitude,
  longitude,
  title = 'Your location',
}) => {
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      title={title}
      identifier="user-location"
      anchor={{ x: 0.5, y: 0.5 }}
      centerOffset={{ x: 0, y: 0 }}
      flat={true}
    >
      {/* Outer translucent circle */}
      <View style={mapStyles.userMarkerOuter}>
        {/* Inner solid circle */}
        <View style={mapStyles.userMarkerInner} />
      </View>
    </Marker>
  );
};