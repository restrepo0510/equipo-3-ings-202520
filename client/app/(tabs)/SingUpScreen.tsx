import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { API_URL } from "@/config/api";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", data.message);
      } else {
        Alert.alert("Error", data.message || "No se pudo registrar.");
      }
    } catch (error) {
      Alert.alert("Error de conexión", "No se pudo conectar al servidor.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/img/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.signupTitle}>Registro</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#bbb"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#bbb"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#bbb"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.line} />

        <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
          <Text style={styles.submitText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  header: {
    flexDirection: "row", // logo + singup
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  signupTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#003300", // dark line
    paddingBottom: 2,
  },
  box: {
    width: "100%",
    backgroundColor: "#768959", // olive green
    borderRadius: 40,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  line: {
    width: "90%",
    height: 1,
    backgroundColor: "#000",
    marginVertical: 15,
  },
  submitBtn: {
    backgroundColor: "#004226", // green
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
