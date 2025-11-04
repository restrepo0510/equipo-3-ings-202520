// app/(tabs)/FavoritesScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createNavItems } from '@/utils/navigationHelpers';
import { favoriteService, Favorite } from '@/services/favoriteService';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/FavoritesScreen.styles';

export default function FavoritesScreen() {
  const router = useRouter();
  const { token } = useAuth();
  const { removeFavorite: removeFavoriteFromContext } = useFavorites();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const navItems = createNavItems('favorites', router);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const data = await favoriteService.getUserFavorites(token);
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    return `$ ${price.toLocaleString()}`;
  };

  const handleProductPress = (product: any) => {
    router.push({
      pathname: '/(tabs)/ProductsScreen',
      params: { restaurantId: product.restaurantId },
    });
  };

  const handleRemoveFavorite = async (productId: string) => {
    if (!token) return;

    try {
      await removeFavoriteFromContext(productId);
      setFavorites(favorites.filter(f => f.product.id !== productId));
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar de favoritos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.yummi}>YUMMI</Text>
          <Text style={styles.headerTitle}>Favs</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.divider} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#27AE60" />
            <Text style={styles.loadingText}>Cargando favoritos...</Text>
          </View>
        ) : favorites.length > 0 ? (
          favorites.map((fav) => (
            <TouchableOpacity
              key={fav.id}
              style={styles.productCard}
              onPress={() => handleProductPress(fav.product)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: fav.product.imageUrl || 'https://via.placeholder.com/80' }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {fav.product.name}
                  </Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {fav.product.description || 'Sin descripción'}
                  </Text>
                </View>

                <View style={styles.priceContainer}>
                  {fav.product.isAvailable && fav.product.stock > 0 ? (
                    <View style={styles.priceTag}>
                      <Text style={styles.priceText}>
                        {formatPrice(fav.product.price)}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.unavailableTag}>
                      <Text style={styles.unavailableText}>No Disp</Text>
                    </View>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleRemoveFavorite(fav.product.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="heart" size={25} color="#FF6B6B" />
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

      <BottomNavigation items={navItems} />
    </View>
  );
}