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
  );
}
