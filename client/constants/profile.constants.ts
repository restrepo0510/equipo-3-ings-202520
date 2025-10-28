// constants/profile.constants.ts

/**
 * Profile-related constant values
 * Centralizes magic numbers and strings for maintainability
 */

export const PROFILE_CONSTANTS = {
  IMAGE: {
    MAX_SIZE_MB: 5,
    MAX_SIZE_BYTES: 5 * 1024 * 1024,
    QUALITY: 0.8,
    ASPECT_RATIO: [1, 1] as [number, number],
    ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/jpg'],
  },
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_PASSWORD_LENGTH: 6,
    PHONE_REGEX: /^\+?[\d\s\-()]{10,}$/,
  },
  FORM_FIELDS: {
    NAME: 'name',
    PHONE: 'phone',
    EMAIL: 'email',
    PASSWORD: 'password',
  },
  DEFAULTS: {
    PROFILE_IMAGE_PATH: '../../assets/img/profile.png',
    INITIALS_MAX_LENGTH: 2,
  },
} as const;

/**
 * Profile screen text content
 * Separated for future i18n implementation
 */
export const PROFILE_TEXT = {
  HEADER: {
    TITLE_PREFIX: 'Mi',
    TITLE_HIGHLIGHT: 'YUMMI',
  },
  EDIT_PROFILE: {
    TITLE: 'Editar Perfil',
    SAVE_BUTTON: 'Guardar',
    SAVE_BUTTON_LOADING: 'Guardando...',
    FIELDS: {
      NAME: 'Nombre',
      PHONE: 'Número de teléfono',
      EMAIL: 'Correo eléctrônico',
      PASSWORD: 'Contraseña',
    },
  },
  ALERTS: {
    LOGOUT_TITLE: 'Cerrar Sesión',
    LOGOUT_MESSAGE: '¿Estás seguro que deseas cerrar sesión?',
    LOGOUT_CANCEL: 'Cancelar',
    LOGOUT_CONFIRM: 'Cerrar Sesión',
    PERMISSION_TITLE: 'Permisos necesarios',
    PERMISSION_MESSAGE: 'Necesitamos acceso a tu galería para cambiar la foto de perfil',
    SUCCESS_TITLE: 'Éxito',
    SUCCESS_MESSAGE: 'Perfil actualizado correctamente.',
    ERROR_TITLE: 'Error',
    ERROR_UPDATE: 'No se pudo actualizar el perfil. Intenta de nuevo.',
    ERROR_LOGOUT: 'No se pudo cerrar sesión. Intenta de nuevo.',
    ERROR_IMAGE_SELECT: 'No se pudo seleccionar la imagen',
    ERROR_MISSING_FIELDS: 'El nombre y el correo son obligatorios.',
    ERROR_INVALID_EMAIL: 'Por favor ingresa un correo válido.',
    ERROR_INVALID_PHONE: 'Por favor ingresa un teléfono válido.',
    ERROR_PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 6 caracteres.',
    ERROR_NOT_AUTHENTICATED: 'Usuario no autenticado.',
    VALIDATION_ERROR_TITLE: 'Error de validación',
  },
  PROFILE: {
    LAST_PURCHASE: 'Última compra',
    COMMENT_TITLE: 'Comentario:',
    COMMENT_PLACEHOLDER: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."',
    LOGOUT_BUTTON: 'Cerrar Sesión',
    DEFAULT_USER_NAME: 'Usuario',
  },
} as const;

/**
 * Icon configuration
 */
export const PROFILE_ICONS = {
  BACK_ARROW: 'arrow-back' as const,
  EDIT_PENCIL: 'pencil' as const,
  LOGOUT: 'log-out-outline' as const,
  FOLDER: 'folder-open' as const,
  DECORATIVE_ADD: 'add' as const,
  SIZE: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    EXTRA_LARGE: 24,
    BUTTON: 30,
    FOLDER: 40,
  },
  COLOR: {
    PRIMARY: '#000',
    SECONDARY: '#FFF',
    DECORATIVE: '#E8E8E8',
    SUCCESS: '#27AE60',
  },
} as const;

/**
 * Profile image error types
 */
export enum ProfileImageError {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  PICKER_CANCELLED = 'PICKER_CANCELLED',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  INVALID_FORMAT = 'INVALID_FORMAT',
  LOAD_FAILED = 'LOAD_FAILED',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Profile form field types
 */
export type ProfileFormField = 
  | 'name' 
  | 'phone' 
  | 'email' 
  | 'password';

/**
 * Keyboard types for form fields
 */
export const KEYBOARD_TYPES: Record<ProfileFormField, 'default' | 'phone-pad' | 'email-address'> = {
  name: 'default',
  phone: 'phone-pad',
  email: 'email-address',
  password: 'default',
} as const;