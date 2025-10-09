import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#27AE60',
        tabBarStyle: { backgroundColor: '#fff' },
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
        name="TestRestaurantsScreen"
        options={{
          title: 'Restaurantes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="restaurant" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
