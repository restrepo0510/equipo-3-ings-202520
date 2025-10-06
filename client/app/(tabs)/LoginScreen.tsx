import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { API_URL } from "@/config/api"; // 👈 importa la URL del backend

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa correo y contraseña.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", data.message);
        // Aquí podrías navegar a otra pestaña o guardar sesión
      } else {
        Alert.alert("Error", data.message || "No se pudo iniciar sesión.");
      }
    } catch (error) {
      Alert.alert("Error de conexión", "No se pudo conectar al servidor.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("@/assets/img/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.cardContainer}>
            <Image
              source={require("@/assets/img/leaf.png")}
              style={[styles.leaf, styles.leafTop]}
            />

            <View style={styles.formCard}>
              <Text style={styles.title}>Iniciar Sesión</Text>
              <View style={styles.underline} />

              <Text style={styles.label}>Correo</Text>
              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={[styles.label, { marginTop: 16 }]}>Contraseña</Text>
              <TextInput
                placeholder="••••••"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text style={styles.submitText}>Enviar</Text>
              </TouchableOpacity>

              <Image
                source={require("@/assets/img/leaf.png")}
                style={[styles.leaf, styles.leafBottom]}
              />
            </View>

            <TouchableOpacity style={styles.unregistered}>
              <Text style={styles.unregisteredText}>No registrado?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  cardContainer: {
    width: "46%",
    maxWidth: 400,
    alignItems: "center",
    marginTop: 0,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#556B2F",
    opacity: 0.8,
    borderRadius: 40,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "stretch",
    position: "relative",
    overflow: "visible",
    zIndex: 2,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 2,
  },
  underline: {
    height: 2,
    backgroundColor: "#0C1706",
    width: 150,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 2,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 42,
    backgroundColor: "#ffffff",
    borderRadius: 21,
    paddingHorizontal: 18,
    color: "#222",
    fontSize: 14,
    marginBottom: 8,
  },
  submitBtn: {
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 42,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#004226",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  unregistered: {
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: "#FDFFD1",
    paddingHorizontal: 24,
    paddingVertical: 8,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#3E400E",
  },
  unregisteredText: {
    color: "#6b6b3f",
    fontWeight: "600",
    fontSize: 13,
    fontStyle: "italic",
  },
  leaf: {
    width: 90,
    height: 90,
    position: "absolute",
    opacity: 0.9,
    zIndex: 1,
  },
  leafTop: {
    top: -20,
    left: -30,
    transform: [{ rotate: "-15deg" }],
  },
  leafBottom: {
    bottom: -25,
    right: -30,
    transform: [{ rotate: "15deg" }],
    width: 100,
    height: 100,
  },
});