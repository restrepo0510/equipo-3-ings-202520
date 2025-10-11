// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
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
    </Tabs>
  );
}