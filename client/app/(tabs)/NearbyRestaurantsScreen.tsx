import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  distance: string;
  logoUrl: string;
  isTop?: boolean;
};

export const NearbyRestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular carga de datos desde el servicio
    setTimeout(() => {
      const data: Restaurant[] = [
        {
          id: '1',
          name: 'Burger King',
          rating: 4.8,
          distance: '200 m',
          logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Burger_King_2020.svg',
          isTop: true,
        },
        {
          id: '2',
          name: 'Colombia Burger',
          rating: 4.5,
          distance: '350 m',
          logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Flag_of_Colombia.svg',
        },
        {
          id: '3',
          name: 'Qbano',
          rating: 4.2,
          distance: '500 m',
          logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Qbano_logo.png',
        },
      ];
      setRestaurants(data);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.infoText}>Cargando restaurantes cercanos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Flag_of_Colombia.svg' }}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Bienvenido, FirstName</Text>
      </View>

      {/* Lista de restaurantes */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, item.isTop && styles.topCard]}>
            <Image source={{ uri: item.logoUrl }} style={styles.restaurantLogo} />
            <View style={styles.cardContent}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantInfo}>
                ⭐ {item.rating}   📍 {item.distance}
              </Text>
              {item.isTop && <Text style={styles.topBadge}>TOP 1</Text>}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Barra inferior */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>🏠 Inicio</Text>
        <Text style={styles.navItem}>🔍 Buscar</Text>
        <Text style={styles.navItem}>❤️ Favoritos</Text>
        <Text style={styles.navItem}>👤 Perfil</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2E7D32',
    borderBottomColor: '#1B5E20',
    borderBottomWidth: 2,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  topCard: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  restaurantLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantInfo: {
    fontSize: 14,
    color: '#777',
    marginTop: 3,
  },
  topBadge: {
    marginTop: 6,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
  navItem: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
  },
});
