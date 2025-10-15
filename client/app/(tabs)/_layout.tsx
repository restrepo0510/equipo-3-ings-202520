// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth.types';

/**
 * Tab Layout with Dynamic Navigation
 */
export default function TabLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Loading State
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#27AE60" />
      </View>
    );
  }

  // ============================================================================
  // Not Authenticated - ONLY Login/SignUp
  // ============================================================================
  
  if (!isAuthenticated) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#27AE60',
          tabBarInactiveTintColor: '#7F8C8D',
          tabBarStyle: { 
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#E8E8E8',
          },
        }}
      >
        <Tabs.Screen
          name="LoginScreen"
          options={{
            title: 'Login',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="login" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="SignUpScreen"
          options={{
            title: 'Registro',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person-add" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  // ============================================================================
  // Authenticated - Role-Based Navigation
  // ============================================================================

  const isCustomer = user?.role === UserRole.CUSTOMER;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#27AE60',
        tabBarInactiveTintColor: '#7F8C8D',
        tabBarStyle: { 
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E8E8E8',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      {/* CUSTOMER NAVIGATION */}
      {isCustomer ? (
        <>
          <Tabs.Screen
            name="HomeScreen"
            options={{
              title: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="MapScreen"
            options={{
              title: 'Mapa',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="map" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="FavoritesScreen"
            options={{
              title: 'Favoritos',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="favorite" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="ProfileScreen"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
          />
        </>
      ) : (
        /* BUSINESS NAVIGATION */
        <>
          <Tabs.Screen
            name="ProductsScreen"
            options={{
              title: 'Productos',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="restaurant-menu" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="OrdersScreen"
            options={{
              title: 'Pedidos',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="shopping-cart" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="ProfileScreen"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="store" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tabs>
  );
}