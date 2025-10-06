import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

// ⚙️ Cambia esta IP según la de tu servidor Nest
const API_URL = 'http://192.168.20.22:3000';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();

    // si data es un arreglo, úsalo; si es un objeto con propiedad "users", usa esa
    const list = Array.isArray(data) ? data : data.users || [];
    setUsers(list);
  } catch (err: any) {
    console.log('Error al obtener usuarios:', err.message);
    setUsers([]);
  }
};


  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Debes ingresar un correo y una contraseña');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        Alert.alert('Registro exitoso', `Usuario creado: ${data.email}`);
        setEmail('');
        setPassword('');
        fetchUsers();
      } else {
        Alert.alert('Error al registrar', data.message || 'Error desconocido');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setToken(data.access_token);
        Alert.alert('Inicio de sesión exitoso');
      } else {
        Alert.alert('Error al iniciar sesión', data.message || 'Error desconocido');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi App con NestJS + Expo 🚀</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#007bff' }]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <View style={styles.userList}>
        <Text style={styles.subtitle}>Usuarios registrados:</Text>
        {users.map((u, i) => (
          <Text key={i} style={styles.userItem}>{u.email}</Text>
        ))}
      </View>

      {token ? (
        <Text style={styles.token}>🔐 Token recibido: {token.substring(0, 20)}...</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0b132b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    backgroundColor: '#1c2541',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    width: '90%',
    padding: 12,
    backgroundColor: '#06d6a0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  userList: {
    marginTop: 20,
    width: '90%',
  },
  subtitle: {
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  userItem: {
    color: '#fff',
    marginBottom: 4,
  },
  token: {
    marginTop: 20,
    color: '#06d6a0',
    fontSize: 12,
  },
});
