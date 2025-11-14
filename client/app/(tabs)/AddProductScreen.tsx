// app/(tabs)/AddProductScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BottomNavigation } from '@/components/ui/bottomNavigation';
import { createBusinessNavItems } from '@/utils/navigationHelpers';
import { productService, CreateProductDto } from '@/services/productService';
import { useAuth } from '@/context/AuthContext';
import { styles } from '@/styles/addProductScreen.styles';

/**
 * AddProductScreen Component
 * 
 * Screen for business users to add new products
 * Includes image picker functionality
 */
export default function AddProductScreen() {
  const router = useRouter();
  const { token, user } = useAuth();
  const navItems = createBusinessNavItems('add', router);

  // Form state
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    stock: 0,
    imageUrl: '',
    category: '',
    isAvailable: true,
    restaurantId: user?.id.toString() || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  /**
   * Update form field
   */
  const updateField = (field: keyof CreateProductDto, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Request camera permissions
   */
  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso Requerido',
        'Se necesita acceso a la cámara para tomar fotos'
      );
      return false;
    }
    return true;
  };

  /**
   * Request media library permissions
   */
  const requestMediaLibraryPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso Requerido',
        'Se necesita acceso a la galería para seleccionar fotos'
      );
      return false;
    }
    return true;
  };

  /**
   * Pick image from gallery
   */
  const pickImageFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    try {
      setIsUploadingImage(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        updateField('imageUrl', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    } finally {
      setIsUploadingImage(false);
    }
  };

  /**
   * Take photo with camera
   */
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    try {
      setIsUploadingImage(true);

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        updateField('imageUrl', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    } finally {
      setIsUploadingImage(false);
    }
  };

  /**
   * Show image picker options
   */
  const showImagePickerOptions = () => {
    Alert.alert(
      'Seleccionar Imagen',
      'Elige una opción',
      [
        {
          text: 'Tomar Foto',
          onPress: takePhoto,
        },
        {
          text: 'Elegir de Galería',
          onPress: pickImageFromGallery,
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * Remove selected image
   */
  const removeImage = () => {
    updateField('imageUrl', '');
  };

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre del producto es requerido');
      return false;
    }

    if (formData.price <= 0) {
      Alert.alert('Error', 'El precio debe ser mayor a 0');
      return false;
    }

    if (formData.stock < 0) {
      Alert.alert('Error', 'El stock no puede ser negativo');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!validateForm() || !token) return;

    try {
      setIsSubmitting(true);

      await productService.create(formData, token);

      Alert.alert(
        'Éxito',
        'Producto creado correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/BusinessProfileScreen'),
          },
        ]
      );

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: undefined,
        stock: 0,
        imageUrl: '',
        category: '',
        isAvailable: true,
        restaurantId: user?.id.toString() || '',
      });
    } catch (error: any) {
      console.error('Error creating product:', error);
      Alert.alert('Error', error.message || 'No se pudo crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Añadir Producto</Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Form */}
        <View style={styles.form}>
          {/* Image Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Imagen del Producto</Text>
            
            {formData.imageUrl ? (
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: formData.imageUrl }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={removeImage}
                >
                  <Ionicons name="close-circle" size={32} color="#E74C3C" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.changeImageButton}
                  onPress={showImagePickerOptions}
                >
                  <Ionicons name="camera" size={20} color="#FFF" />
                  <Text style={styles.changeImageText}>Cambiar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={showImagePickerOptions}
                disabled={isUploadingImage}
              >
                {isUploadingImage ? (
                  <ActivityIndicator color="#27AE60" />
                ) : (
                  <>
                    <Ionicons name="camera" size={48} color="#9CA3AF" />
                    <Text style={styles.imagePickerText}>
                      Toca para agregar imagen
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Ej: Pizza Margarita"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(value) => updateField('description', value)}
              placeholder="Describe el producto..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Price Row */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Precio *</Text>
              <TextInput
                style={styles.input}
                value={formData.price.toString()}
                onChangeText={(value) =>
                  updateField('price', parseFloat(value) || 0)
                }
                placeholder="10000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Precio Original</Text>
              <TextInput
                style={styles.input}
                value={formData.originalPrice?.toString() || ''}
                onChangeText={(value) =>
                  updateField('originalPrice', value ? parseFloat(value) : undefined)
                }
                placeholder="15000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Stock */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stock Inicial *</Text>
            <TextInput
              style={styles.input}
              value={formData.stock.toString()}
              onChangeText={(value) =>
                updateField('stock', parseInt(value) || 0)
              }
              placeholder="50"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoría</Text>
            <TextInput
              style={styles.input}
              value={formData.category}
              onChangeText={(value) => updateField('category', value)}
              placeholder="Ej: Pizza, Hamburguesas, Postres"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Availability Toggle */}
          <View style={styles.toggleContainer}>
            <Text style={styles.label}>Disponible inmediatamente</Text>
            <TouchableOpacity
              style={[
                styles.toggle,
                formData.isAvailable && styles.toggleActive,
              ]}
              onPress={() => updateField('isAvailable', !formData.isAvailable)}
            >
              <View
                style={[
                  styles.toggleThumb,
                  formData.isAvailable && styles.toggleThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                <Text style={styles.submitButtonText}>Crear Producto</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </View>
  );
}