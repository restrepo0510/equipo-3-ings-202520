<<<<<<< HEAD
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/(tabs)/LoginScreen";
import ProfileScreen from "./app/(tabs)/user_profile";
import EditProfileScreen from "./app/(tabs)/edit_profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pantalla inicial */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Otras pantallas */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
=======
import { Slot } from 'expo-router';
import { StripeProvider } from '@stripe/stripe-react-native';

// Reemplaza con tu clave pública de Stripe (pk_test_...)
const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_tu_clave_publica_aqui';

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <Slot />
    </StripeProvider>
>>>>>>> 88cf0bff64dc45796733e32b7425fd05109820fa
  );
}
