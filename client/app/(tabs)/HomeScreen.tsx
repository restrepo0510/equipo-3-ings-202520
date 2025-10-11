// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from '../../hooks/useLocation';
import { restaurantService, Restaurant } from '../../services/restaurantService';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const HomeScreen: React.FC = () => {
  const { location } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchText, setSearchText] = useState('');
  const [userName] = useState('Usuario'); // Puedes obtenerlo del contexto de auth

  useEffect(() => {
    loadRestaurants();
  }, [location]);

  const loadRestaurants = async () => {
    if (!location) return;
    const data = await restaurantService.getNearbyRestaurants({
      latitude: location.latitude,
      longitude: location.longitude,
      radius: 10,
    });
    setRestaurants(data);
  };

  const topRestaurant = restaurants.find(r => r.isActive);
  const otherRestaurants = restaurants.filter(r => r.id !== topRestaurant?.id);

  return (
    <View style={styles.container}>
      {/* Header con logo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/img/logo.png')} // Agrega tu logo aquí
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar restaurantes..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#95A5A6"
          />
        </View>

        {/* Saludo */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            <Text style={styles.greetingBold}>Bienvenido</Text>{' '}
            <Text style={styles.greetingName}>{userName}</Text>
          </Text>
        </View>

        {/* Grid de restaurantes destacados */}
        <View style={styles.gridContainer}>
          {otherRestaurants.slice(0, 2).map((restaurant, index) => (
            <TouchableOpacity
              key={restaurant.id}
              style={[
                styles.gridCard,
                index % 2 === 0 ? styles.gridCardLeft : styles.gridCardRight,
              ]}
            >
              <View style={styles.gridCardInner}>
                {/* Badge de país/categoría */}
                {restaurant.category && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{restaurant.category}</Text>
                  </View>
                )}
                
                <Image
                  source={{ uri: restaurant.imageUrl || 'https://via.placeholder.com/200' }}
                  style={styles.gridImage}
                />
                
                <View style={styles.gridInfo}>
                  <Text style={styles.gridTitle} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Restaurante TOP 1 */}
        {topRestaurant && (
          <View style={styles.topSection}>
            <View style={styles.topBadge}>
              <Ionicons name="trophy" size={20} color="#FFF" />
              <Text style={styles.topBadgeText}>TOP 1</Text>
            </View>

            <TouchableOpacity style={styles.topCard}>
              <Image
                source={{ uri: topRestaurant.imageUrl || 'https://via.placeholder.com/400x200' }}
                style={styles.topImage}
              />
              
              {/* Logo del restaurante */}
              {topRestaurant.category && (
                <View style={styles.restaurantLogo}>
                  <Text style={styles.restaurantLogoText}>
                    {topRestaurant.category.substring(0, 1)}
                  </Text>
                </View>
              )}

              <View style={styles.topInfo}>
                <Text style={styles.topTitle}>{topRestaurant.name}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Más restaurantes */}
        <View style={styles.moreSection}>
          {otherRestaurants.slice(2).map(restaurant => (
            <TouchableOpacity key={restaurant.id} style={styles.listCard}>
              <Image
                source={{ uri: restaurant.imageUrl || 'https://via.placeholder.com/100' }}
                style={styles.listImage}
              />
              <View style={styles.listInfo}>
                <Text style={styles.listTitle}>{restaurant.name}</Text>
                <Text style={styles.listAddress} numberOfLines={1}>
                  {restaurant.address}
                </Text>
                {restaurant.distance && (
                  <Text style={styles.listDistance}>📍 {restaurant.distance} km</Text>
                )}
              </View>
              {restaurant.isActive && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="location" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  logo: {
    width: 120,
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EDF2',
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
    color: '#2C3E50',
  },
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
    color: '#2C3E50',
  },
  greetingName: {
    color: '#7F8C8D',
    fontWeight: '400',
  },
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
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  gridImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E8E8E8',
  },
  gridInfo: {
    padding: 12,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  topSection: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  topBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  topCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  topImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E8E8E8',
  },
  restaurantLogo: {
    position: 'absolute',
    top: 140,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  restaurantLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  topInfo: {
    padding: 16,
    paddingTop: 12,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  moreSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E8E8E8',
  },
  listInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  listAddress: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  listDistance: {
    fontSize: 12,
    color: '#27AE60',
    fontWeight: '600',
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#27AE60',
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#1B3A2F',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    padding: 8,
  },
});