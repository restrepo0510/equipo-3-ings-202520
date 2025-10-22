// app/(tabs)/EditProductScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/context/AuthContext';
import { productService, Product } from '@/services/productService';
import { styles } from '@/styles/EditProductScreen.styles';

/**
 * EditProductScreen
 * 
 * Allows business users to edit existing products
 * Matches the design from the provided image
 */
export default function EditProductScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const { token } = useAuth();

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Load product data on mount
   */
  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    if (!productId || !token) return;

    try {
      setIsLoading(true);
      const product = await productService.getById(productId as string, token);
      
      setName(product.name);
      setDescription(product.description || '');
      setPrice(product.price.toString());
      setImageUrl(product.imageUrl || '');
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'No se pudo cargar el producto');
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Pick image from gallery
   */
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  /**
   * Save product changes
   */
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre del producto es requerido');
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('Error', 'Ingresa un precio válido');
      return;
    }

    if (!token || !productId) return;

    try {
      setIsSaving(true);

      await productService.update(
        productId as string,
        {
          name: name.trim(),
          description: description.trim() || undefined,
          price: Number(price),
          imageUrl: imageUrl || undefined,
        },
        token
      );

      Alert.alert('Éxito', 'Producto actualizado correctamente');
      router.back();
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto');
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Delete product
   */
  const handleDelete = () => {
    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (!token || !productId) return;

            try {
              await productService.delete(productId as string, token);
              Alert.alert('Éxito', 'Producto eliminado');
              router.back();
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'No se pudo eliminar el producto');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#27AE60" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Inventario</Text>
        </View>

        <View style={styles.divider} />

        {/* Form Title */}
        <Text style={styles.formTitle}>Editar Producto</Text>

        {/* Product Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Producto</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Producto 3"
            placeholderTextColor="#BDC3C7"
          />
        </View>

        {/* Product Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción del producto</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Detalles del producto..."
            placeholderTextColor="#BDC3C7"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Image and Price Row */}
        <View style={styles.row}>
          {/* Product Image */}
          <View style={styles.imageSection}>
            <Text style={styles.label}>Imagen{'\n'}Producto</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handlePickImage}
            >
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.productImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="#BDC3C7" />
                </View>
              )}
            </TouchableOpacity>

            {/* Gallery Button */}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handlePickImage}
            >
              <Ionicons name="folder-open" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.label}>Precio</Text>
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={setPrice}
              placeholder="$15.000"
              placeholderTextColor="#BDC3C7"
              keyboardType="numeric"
            />

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButtonCircle}
                onPress={handleDelete}
              >
                <Ionicons name="trash" size={24} color="#FFF" />
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButtonCircle}
                onPress={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Ionicons name="checkmark" size={28} color="#FFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}