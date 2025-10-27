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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/ui/BottomNavigation';
import { createBusinessNavItems } from '@/utils/navigationHelpers';
import { productService, CreateProductData } from '@/services/productService';
import { useAuth } from '@/context/AuthContext';
import { styles} from '../../styles/AddProductScreen.styles';

/**
 * AddProductScreen Component
 * 
 * Screen for business users to add new products
 */
export default function AddProductScreen() {
  const router = useRouter();
  const { token, user } = useAuth();
  const navItems = createBusinessNavItems('add', router);

  // Form state
  const [formData, setFormData] = useState<CreateProductData>({
    name: '',
    description: '',
    price: 0,
    originalPrice: undefined,
    stock: 0,
    imageUrl: '',
    category: '',
    isAvailable: true,
    restaurantId: user?.id.toString() || '', // Adjust based on your user structure
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Update form field
   */
  const updateField = (field: keyof CreateProductData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

          {/* Image URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL de Imagen</Text>
            <TextInput
              style={styles.input}
              value={formData.imageUrl}
              onChangeText={(value) => updateField('imageUrl', value)}
              placeholder="https://..."
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
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