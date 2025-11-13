// constants/businessProfile.constants.ts

/**
 * Business Profile Constants
 * Centralized constants for business profile management
 */

export const BUSINESS_PROFILE_CONSTANTS = {
  IMAGE: {
    MAX_SIZE_MB: 5,
    QUALITY: 0.8,
    ASPECT_RATIO: [1, 1] as [number, number],
  },
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_PHONE_LENGTH: 10,
    MAX_PHONE_LENGTH: 15,
    MIN_ADDRESS_LENGTH: 10,
    TIME_REGEX: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  },
} as const;

export const BUSINESS_PROFILE_TEXT = {
  HEADER: {
    TITLE: 'Mi',
    HIGHLIGHT: 'YUMMI',
    SUBTITLE: 'Enterprise',
  },
  LOADING: {
    TEXT: 'Cargando...',
  },
  FORM: {
    TITLE: 'Editar Perfil',
    LABELS: {
      BUSINESS_NAME: 'Nombre del Negocio',
      PHONE: 'Teléfono',
      EMAIL: 'Correo Eléctronico',
      ADDRESS: 'Dirección',
      DESCRIPTION: 'Descripción',
      CATEGORY: 'Categoría',
      OPENING_TIME: 'Hora Inicio',
      CLOSING_TIME: 'Hora Cierre',
    },
    PLACEHOLDERS: {
      BUSINESS_NAME: 'Nombre del restaurante',
      PHONE: '+57 300 123 4567',
      EMAIL: 'email@example.com',
      ADDRESS: 'Calle 123 #45-67, Medellín',
      DESCRIPTION: 'Describe tu negocio...',
      CATEGORY: 'Ej: Comida Rápida, Pizza, etc.',
      OPENING_TIME: '08:00',
      CLOSING_TIME: '20:00',
    },
  },
  BUTTONS: {
    SAVE: 'Guardar Cambios',
    CANCEL: 'Cancelar',
  },
  ALERTS: {
    IMAGE_PICKER_TITLE: 'Foto del Negocio',
    IMAGE_PICKER_MESSAGE: 'Elige una opción',
    IMAGE_PICKER_TAKE_PHOTO: 'Tomar Foto',
    IMAGE_PICKER_CHOOSE_GALLERY: 'Elegir de Galería',
    IMAGE_PICKER_CANCEL: 'Cancelar',
    REMOVE_IMAGE_TITLE: 'Eliminar Foto',
    REMOVE_IMAGE_MESSAGE: '¿Estás seguro de eliminar la foto del negocio?',
    SUCCESS_TITLE: 'Éxito',
    SUCCESS_MESSAGE: 'Información actualizada correctamente',
    ERROR_LOAD_DATA: 'No se pudo cargar la información del negocio',
    ERROR_UPDATE: 'No se pudo actualizar la información',
    ERROR_SELECT_IMAGE: 'No se pudo seleccionar la imagen',
    ERROR_TAKE_PHOTO: 'No se pudo tomar la foto',
    PERMISSION_CAMERA: 'Se necesita acceso a la cámara',
    PERMISSION_GALLERY: 'Se necesita acceso a la galería',
  },
  VALIDATION_ERRORS: {
    ADDRESS_REQUIRED: 'La dirección es requerida',
    CATEGORY_REQUIRED: 'La categoría es requerida',
    OPENING_TIME_REQUIRED: 'La hora de apertura es requerida',
    CLOSING_TIME_REQUIRED: 'La hora de cierre es requerida',
    INVALID_TIME_FORMAT: 'Formato de hora inválido (use HH:MM)',
  },
} as const;

export const BUSINESS_PROFILE_ICONS = {
  BACK: 'arrow-back' as const,
  BUSINESS: 'business' as const,
  CLOSE: 'close-circle' as const,
  FOLDER: 'folder-open' as const,
  CHECKMARK: 'checkmark-circle' as const,
  SIZE: {
    SMALL: 24,
    MEDIUM: 28,
    LARGE: 40,
    EXTRA_LARGE: 48,
  },
  COLORS: {
    PRIMARY: '#000',
    SECONDARY: '#9CA3AF',
    SUCCESS: '#27AE60',
    DANGER: '#E74C3C',
    WHITE: '#FFF',
  },
} as const;