// app/(tabs)/FavoritesScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';

const { width } = Dimensions.get('window');

// Interface para productos favoritos
interface FavoriteProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export default function FavoritesScreen() {
  const router = useRouter();
  const navItems = createNavItems('favorites', router);

  // Estado de productos favoritos (esto debería venir de tu API/Context)
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    {
      id: 1,
      name: 'Producto 1',
      description: 'Detalles del producto... lorem ipsum',
      price: 15000,
      image: 'https://via.placeholder.com/80', // Reemplaza con tu URL de imagen
      available: true
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Detalles del producto... lorem ipsum',
      price: 12000,
      image: 'https://via.placeholder.com/80',
      available: false
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Detalles del producto... lorem ipsum',
      price: 10000,
      image: 'https://via.placeholder.com/80',
      available: true
    }
  ]);

  const formatPrice = (price: number): string => {
    return `$ ${(price / 1000).toFixed(3)}`;
  };

  const handleProductPress = (productId: number) => {
    // Navegar al detalle del producto usando pathname y params
    router.push({
      pathname: '/(tabs)/ProductsScreen',
      params: { productId: productId }
    });
  };

  const handleRemoveFavorite = (productId: number) => {
    // Lógica para remover de favoritos
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image 
            source={require('../../assets/img/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Favs</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.divider} />

      {/* Products List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                  </Text>
                </View>

                {/* Price or Status */}
                <View style={styles.priceContainer}>
                  {product.available ? (
                    <View style={styles.priceTag}>
                      <Text style={styles.priceText}>
                        {formatPrice(product.price)}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.unavailableTag}>
                      <Text style={styles.unavailableText}>No Disp</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Heart Icon to Remove */}
              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleRemoveFavorite(product.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="heart" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#BDC3C7" />
            <Text style={styles.emptyTitle}>No hay favoritos</Text>
            <Text style={styles.emptySubtitle}>
              Agrega productos a tus favoritos para verlos aquí
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 48,
    height: 48,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  headerSpacer: {
    width: 40,
  },
  divider: {
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Space for bottom nav
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    marginRight: 16,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  priceContainer: {
    flexShrink: 0,
  },
  priceTag: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  unavailableTag: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  unavailableText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});