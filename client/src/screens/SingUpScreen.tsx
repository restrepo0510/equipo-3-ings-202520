import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      {/* Logo + Title */}
      <View style={styles.header}>
        <Image
          source={require("/src/assets/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.signupTitle}>Registro</Text>
      </View>

      {/* Green Box */}
      <View style={styles.box}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} placeholderTextColor="#bbb" />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#bbb"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#bbb"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#bbb"
          secureTextEntry
        />

        <View style={styles.line} />

        <TouchableOpacity style={styles.submitBtn}>
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
