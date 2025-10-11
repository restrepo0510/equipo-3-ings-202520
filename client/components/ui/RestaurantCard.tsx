// components/RestaurantCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Restaurant } from '../../services/restaurantService';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress?: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.container}>
        {restaurant.imageUrl && (
          <Image
            source={{ uri: restaurant.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{restaurant.name}</Text>
            {restaurant.distance !== undefined && (
              <Text style={styles.distance}>{restaurant.distance} km</Text>
            )}
          </View>

          {restaurant.category && (
            <Text style={styles.category}>{restaurant.category}</Text>
          )}

          <Text style={styles.address} numberOfLines={2}>
            {restaurant.address}
          </Text>

          {restaurant.openingTime && restaurant.closingTime && (
            <Text style={styles.hours}>
              🕒 {restaurant.openingTime} - {restaurant.closingTime}
            </Text>
          )}

          <View style={styles.footer}>
            <View style={[styles.statusBadge, restaurant.isActive ? styles.active : styles.inactive]}>
              <Text style={styles.statusText}>
                {restaurant.isActive ? 'Disponible' : 'No disponible'}
              </Text>
            </View>

            <TouchableOpacity style={styles.mapButton} onPress={openInMaps}>
              <Text style={styles.mapButtonText}>📍 Ver en mapa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27AE60',
    marginLeft: 8,
  },
  category: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 8,
  },
  hours: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  active: {
    backgroundColor: '#D5F4E6',
  },
  inactive: {
    backgroundColor: '#F8D7DA',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  mapButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  mapButtonText: {
    fontSize: 13,
    color: '#3498DB',
    fontWeight: '600',
  },
});