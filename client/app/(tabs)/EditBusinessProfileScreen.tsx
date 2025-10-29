// app/(tabs)/EditBusinessProfileScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createBusinessNavItems } from '@/utils/navigationHelpers';
import { useAuth } from '@/context/AuthContext';
import { restaurantService } from '@/services/restaurantService';
import { styles } from '@/styles/EditBusinessProfileScreen.styles';

/**
 * EditBusinessProfileScreen
 * 
 * Allows business users to edit their restaurant/business information
 * Includes image picker for logo/profile picture
 */
export default function EditBusinessProfileScreen() {
  const router = useRouter();
  const { user, token } = useAuth();
  const navItems = createBusinessNavItems('profile', router);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    category: '',
    openingTime: '',
    closingTime: '',
    imageUrl: '', // ✅ Agregado para imagen
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  /**
   * Load restaurant data on mount
   */
  useEffect(() => {
    loadRestaurantData();
  }, []);

  const loadRestaurantData = async () => {
    if (!user?.id || !token) return;

    try {
      setIsLoading(true);
      const restaurant = await restaurantService.getById(user.id);
      
      setFormData({
        name: restaurant.name || '',
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        address: restaurant.address || '',
        description: restaurant.description || '',
        category: restaurant.category || '',
        openingTime: restaurant.openingTime || '',
        closingTime: restaurant.closingTime || '',
        imageUrl: restaurant.imageUrl || '', // ✅ Cargar imagen existente
      });
    } catch (error) {
      console.error('Error loading restaurant data:', error);
      Alert.alert('Error', 'No se pudo cargar la información del negocio');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update form field
   */
  const handleFieldChange = (field: keyof typeof formData, value: string) => {
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
        aspect: [1, 1], // Square for profile picture
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleFieldChange('imageUrl', result.assets[0].uri);
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
        aspect: [1, 1], // Square for profile picture
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleFieldChange('imageUrl', result.assets[0].uri);
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
      'Foto del Negocio',
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
    Alert.alert(
      'Eliminar Foto',
      '¿Estás seguro de eliminar la foto del negocio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => handleFieldChange('imageUrl', ''),
        },
      ]
    );
  };

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'El nombre del negocio es requerido');
      return false;
    }

    if (!formData.address.trim()) {
      Alert.alert('Error', 'La dirección es requerida');
      return false;
    }

    return true;
  };

  /**
   * Save changes
   */
  const handleSave = async () => {
    if (!validateForm() || !user?.id || !token) return;

    try {
      setIsSaving(true);

      await restaurantService.update(
        String(user.id),
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          description: formData.description.trim(),
          category: formData.category.trim(),
          openingTime: formData.openingTime.trim(),
          closingTime: formData.closingTime.trim(),
          imageUrl: formData.imageUrl.trim(), // ✅ Incluir imagen
        },
        token
      );

      Alert.alert('Éxito', 'Información actualizada correctamente');
      router.back();
    } catch (error) {
      console.error('Error saving:', error);
      Alert.alert('Error', 'No se pudo actualizar la información');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#27AE60" />
          <Text style={styles.loadingText}>Cargando...</Text>
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
            <Text style={styles.headerTitle}>
              Mi <Text style={styles.yummi}>YUMMI</Text>
            </Text>
            <Text style={styles.headerSubtitle}>Enterprise</Text>
          </View>
        </View>


        {/* Divider */}
        <View style={styles.divider} />

        {/* Form */}
        <View style={styles.form}>
          {/* ✅ Profile Picture Section */}
          <View style={styles.profilePictureSection}>
            <Text style={styles.label}>Editar Perfil</Text>
            
            <View style={styles.profilePictureContainer}>
              {formData.imageUrl ? (
                <View style={styles.profileImageWrapper}>
                  <Image
                    source={{ uri: formData.imageUrl }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    style={styles.removeProfileImageButton}
                    onPress={removeImage}
                  >
                    <Ionicons name="close-circle" size={28} color="#E74C3C" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Ionicons name="business" size={48} color="#9CA3AF" />
                </View>
              )}

              <TouchableOpacity
                style={styles.changeProfileImageButton}
                onPress={showImagePickerOptions}
                disabled={isUploadingImage}
              >
                {isUploadingImage ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="folder-open" size={40} color="#000" />
                    </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Business Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del Negocio</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleFieldChange('name', value)}
              placeholder="Nombre del restaurante"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(value) => handleFieldChange('phone', value)}
              placeholder="+57 300 123 4567"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Eléctronico</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(value) => handleFieldChange('email', value)}
              placeholder="email@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.address}
              onChangeText={(value) => handleFieldChange('address', value)}
              placeholder="Calle 123 #45-67, Medellín"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(value) => handleFieldChange('description', value)}
              placeholder="Describe tu negocio..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoría</Text>
            <TextInput
              style={styles.input}
              value={formData.category}
              onChangeText={(value) => handleFieldChange('category', value)}
              placeholder="Ej: Comida Rápida, Pizza, etc."
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Opening Hours */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Hora Inicio</Text>
              <TextInput
                style={styles.input}
                value={formData.openingTime}
                onChangeText={(value) => handleFieldChange('openingTime', value)}
                placeholder="08:00"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Hora Cierre</Text>
              <TextInput
                style={styles.input}
                value={formData.closingTime}
                onChangeText={(value) => handleFieldChange('closingTime', value)}
                placeholder="20:00"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={isSaving}
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