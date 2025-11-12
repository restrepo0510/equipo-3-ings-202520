// components/ui/map/UserLocationMarker.tsx
import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { mapStyles } from '@/styles/mapScreen.styles';

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
  // Validate coordinates
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    console.error('❌ Invalid user location coordinates:', { latitude, longitude });
    return null;
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    console.error('❌ User coordinates out of range:', { lat, lon });
    return null;
  }

  return (
    <Marker
      coordinate={{ latitude: lat, longitude: lon }}
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