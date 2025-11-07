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
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/context/AuthContext';
import { productService, Product } from '@/services/productService';
import { CustomAlertHelper } from '@/components/ui/CustomAlert';
import { styles } from '@/styles/EditProductScreen.styles';

/**
 * EditProductScreen
 * 
 * Allows business users to edit existing products
 * Uses CustomAlert for all user feedback
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
      CustomAlertHelper.error(
        'Error',
        'No se pudo cargar el producto',
        () => router.back()
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Pick image from gallery
   */
  const handlePickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        CustomAlertHelper.warning(
          'Permisos necesarios',
          'Necesitamos acceso a tu galería para seleccionar imágenes'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImageUrl(result.assets[0].uri);
        CustomAlertHelper.success(
          'Imagen seleccionada',
          'La imagen se guardará cuando presiones el botón de enviar'
        );
      }
    } catch (error) {
      console.error('Error picking image:', error);
      CustomAlertHelper.error('Error', 'No se pudo seleccionar la imagen');
    }
  };

  /**
   * Save product changes
   */
  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      CustomAlertHelper.error(
        'Campo requerido',
        'El nombre del producto es obligatorio'
      );
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      CustomAlertHelper.error(
        'Precio inválido',
        'Por favor ingresa un precio válido mayor a 0'
      );
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

      CustomAlertHelper.success(
        '¡Éxito!',
        'Producto actualizado correctamente',
        () => router.back()
      );
    } catch (error) {
      console.error('Error saving product:', error);
      CustomAlertHelper.error(
        'Error',
        'No se pudo actualizar el producto. Intenta de nuevo.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Delete product with confirmation
   */
  const handleDelete = () => {
    CustomAlertHelper.alert(
      'Eliminar Producto',
      '¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            if (!token || !productId) return;

            try {
              await productService.delete(productId as string, token);
              CustomAlertHelper.success(
                'Producto eliminado',
                'El producto ha sido eliminado exitosamente',
                () => router.back()
              );
            } catch (error) {
              console.error('Error deleting product:', error);
              CustomAlertHelper.error(
                'Error',
                'No se pudo eliminar el producto. Intenta de nuevo.'
              );
            }
          },
        },
      ],
      'warning'
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27AE60" />
          <Text style={styles.loadingText}>Cargando producto...</Text>
        </View>
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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Inventario</Text>
          </View>
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
            placeholder="Ej: Hamburguesa Especial"
            placeholderTextColor="#BDC3C7"
            editable={!isSaving}
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
            editable={!isSaving}
          />
        </View>

        {/* Image and Price Row */}
        <View style={styles.row}>
          {/* Product Image */}
          <View style={styles.imageSection}>
            <Text style={styles.imageText}>Imagen{'\n'}Producto</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handlePickImage}
              disabled={isSaving}
            >
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.productImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={32} color="#BDC3C7" />
                  <Text style={styles.imagePlaceholderText}>Toca para{'\n'}agregar</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Gallery Button */}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handlePickImage}
              disabled={isSaving}
            >
              <Ionicons name="folder-open" size={48} color="#000" />
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
              editable={!isSaving}
            />

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButtonCircle}
                onPress={handleDelete}
                disabled={isSaving}
              >
                <Ionicons name="trash" size={24} color="#FFF" />
              </TouchableOpacity>

              {/* Save Button */}
              <TouchableOpacity
                style={[
                  styles.saveButtonCircle,
                  isSaving && styles.saveButtonDisabled
                ]}
                onPress={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <Ionicons name="send" size={28} color="#000" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}