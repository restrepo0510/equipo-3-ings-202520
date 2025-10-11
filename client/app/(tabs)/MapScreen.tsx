import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BottomNavigation, NavItem } from '../../components/ui/BottomNavigation';
import { restaurantService, Restaurant } from '../../services/restaurantService';
import { useLocation } from '../../hooks/useLocation';
import { COLORS } from '../../styles/homeScreen.styles';

export default function MapScreen() {
  const { location } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        if (!location) return;
        setLoading(true);
        const data = await restaurantService.getNearby({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: 100,
        });
        console.log('📍 Restaurantes cercanos cargados:', data.length);
        setRestaurants(data);
      } catch (err) {
        console.error('❌ Error cargando restaurantes:', err);
        setError('No se pudieron cargar los restaurantes');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, [location]);

  const handleMarkerPress = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  const navItems: NavItem[] = [
    { id: 'home', icon: 'home', onPress: () => console.log('Home pressed') },
    { id: 'favorites', icon: 'heart-outline', onPress: () => console.log('Favorites pressed') },
    { id: 'chat', icon: 'chatbubbles-outline', onPress: () => console.log('Chat pressed') },
    { id: 'profile', icon: 'person-outline', onPress: () => console.log('Profile pressed') },
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primaryDark} />
        <Text style={{ marginTop: 10 }}>Cargando restaurantes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red' }}>{error}</Text>
        <BottomNavigation items={navItems} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
>
  {/* 🔵 Círculo de ubicación del usuario */}
  <Marker
    coordinate={{
      latitude: location.latitude,
      longitude: location.longitude,
    }}
    title="Tu ubicación"
  >
    <View
      style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 122, 255, 0.3)', // azul translúcido
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: 12,
          width: 12,
          borderRadius: 6,
          backgroundColor: COLORS.primaryDark, // color principal del tema
        }}
      />
    </View>
  </Marker>

  {/* 📍 Marcadores de restaurantes */}
  {restaurants.map((r) => (
    <Marker
      key={r.id}
      coordinate={{
        latitude: Number(r.latitude) || 0,
        longitude: Number(r.longitude) || 0,
      }}
      title={r.name}
      onPress={() => handleMarkerPress(r)}
    />
  ))}
</MapView>

      )}

      {selectedRestaurant && (
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Image
              source={{ uri: selectedRestaurant.imageUrl || 'https://via.placeholder.com/100' }}
              style={styles.image}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('Ver productos de', selectedRestaurant.name)}
            >
              <Text style={styles.buttonText}>Ver productos</Text>
            </TouchableOpacity>

            <Text style={styles.name}>{selectedRestaurant.name}</Text>
          </View>
        </View>
      )}

      <BottomNavigation items={navItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  card: {
    width: 230,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
  },
  button: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    marginRight: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
});
