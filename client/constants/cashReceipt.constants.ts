// constants/cashReceipt.constants.ts

/**
 * Cash Receipt Configuration Constants
 */
export const CASH_RECEIPT_CONFIG = {
  /** Default expiration time in hours */
  DEFAULT_EXPIRATION_HOURS: 24,
  
  /** QR Code configuration */
  QR_CODE: {
    SIZE: 300,
    ERROR_CORRECTION: 'H' as const,
    MARGIN: 2,
  },
  
  /** Receipt code format */
  CODE_PREFIX: 'CR-',
  CODE_LENGTH: 8,
  
  /** PDF configuration */
  PDF: {
    PAGE_SIZE: 'A4' as const,
    MARGIN: 50,
  },
} as const;

/**
 * Cash Receipt Text Content
 */
export const CASH_RECEIPT_TEXT = {
  MODAL: {
    HEADER_TITLE: 'Recibo de Pago',
    SUCCESS_TITLE: '¡Reserva Confirmada!',
    SUCCESS_SUBTITLE: 'Presenta este recibo en el restaurante',
  },
  
  CODE: {
    LABEL: 'Código de Recibo',
    SHARE_BUTTON: 'Compartir Código',
  },
  
  QR: {
    LABEL: 'Escanea en el restaurante',
    INFO_MESSAGE: 'El personal del restaurante puede escanear este código QR para validar tu pago rápidamente.\n\nTambién puedes proporcionar el código alfanumérico si es necesario.',
  },
  
  TIMER: {
    LABEL: 'Tiempo restante',
    EXPIRED: 'Expirado',
    FORMAT: (hours: number, minutes: number) => `${hours}h ${minutes}m restantes`,
  },
  
  SECTIONS: {
    ORDER_DETAILS: 'Detalles del Pedido',
    INSTRUCTIONS: '📋 Instrucciones:',
    IMPORTANT: 'Importante',
  },
  
  LABELS: {
    RESTAURANT: 'Restaurante:',
    ADDRESS: 'Dirección:',
    PRODUCT: 'Producto:',
    QUANTITY: 'Cantidad:',
    UNIT_PRICE: 'Precio unitario:',
    SUBTOTAL: 'Subtotal:',
    DISCOUNT: 'Descuento:',
    TOTAL: 'TOTAL A PAGAR:',
    STATUS: 'Estado:',
    EXPIRES_AT: 'Válido hasta:',
    CREATED_AT: 'Fecha de emisión:',
  },
  
  INSTRUCTIONS: {
    STEP_1: 'Dirígete al restaurante con este recibo',
    STEP_2: 'Presenta el código QR o el código de recibo',
    STEP_3: 'Realiza el pago en efectivo por el monto total',
    STEP_4: 'Recibe tu pedido una vez validado el pago',
  },
  
  WARNINGS: {
    EXPIRATION: (date: string) => `⚠️ Este recibo expira el: ${date}`,
    EXPIRING_SOON: (timeLeft: string) => 
      `Tu recibo expirará en ${timeLeft}.\n\nDirígete al restaurante lo antes posible.`,
    EXPIRED: 'Este recibo ha expirado y ya no puede ser utilizado.\n\nPor favor, genera un nuevo recibo.',
    SHARE_WARNING: 'Solo comparte este código con personas de confianza.',
  },
  
  BUTTONS: {
    DOWNLOAD_PDF: 'Descargar PDF',
    SHARE_CODE: 'Compartir Código',
    GO_HOME: 'Ir al Inicio',
    CLOSE: 'Cerrar',
    CANCEL: 'Cancelar Recibo',
    VIEW_DETAILS: 'Ver Detalles',
  },
  
  SHARE: {
    TITLE: 'Compartir Recibo',
    MESSAGE: (code: string, restaurant: string, total: string, expires: string) =>
      `Mi código de recibo: ${code}\n\nRestaurante: ${restaurant}\nTotal: ${total}\n\nVálido hasta: ${expires}`,
  },
  
  ALERTS: {
    CREATED_TITLE: '¡Recibo Generado!',
    CREATED_MESSAGE: (code: string) =>
      `Tu recibo ${code} ha sido creado exitosamente.\n\nPuedes presentarlo en el restaurante para pagar en efectivo.`,
    
    ERROR_TITLE: 'Error al Generar Recibo',
    ERROR_MESSAGE: 'No se pudo generar el recibo.\n\nPor favor, intenta nuevamente.',
    
    PDF_SUCCESS_TITLE: 'PDF Descargado',
    PDF_SUCCESS_MESSAGE: 'El recibo ha sido descargado exitosamente.',
    
    PDF_ERROR_TITLE: 'Error al Descargar PDF',
    PDF_ERROR_MESSAGE: 'No se pudo descargar el PDF.\n\nPor favor, intenta nuevamente.',
    
    CANCEL_CONFIRM_TITLE: 'Cancelar Recibo',
    CANCEL_CONFIRM_MESSAGE: '¿Estás seguro de que deseas cancelar este recibo?\n\nEsta acción no se puede deshacer.',
    
    CANCELLED_TITLE: 'Recibo Cancelado',
    CANCELLED_MESSAGE: 'El recibo ha sido cancelado exitosamente.',
    
    EXPIRED_TITLE: 'Recibo Expirado',
    EXPIRED_MESSAGE: 'Este recibo ha expirado y ya no puede ser utilizado.\n\nPor favor, genera un nuevo recibo.',
    
    VALIDATED_TITLE: 'Recibo Validado',
    VALIDATED_MESSAGE: (code: string) =>
      `El recibo ${code} ha sido validado exitosamente.\n\nEl pago ha sido confirmado.`,
    
    INVALID_CODE_TITLE: 'Código Inválido',
    INVALID_CODE_MESSAGE: 'El código de recibo ingresado no es válido.\n\nPor favor, verifica e intenta nuevamente.',
    
    NOT_FOUND_TITLE: 'Recibo No Encontrado',
    NOT_FOUND_MESSAGE: 'No se pudo encontrar el recibo.\n\nVerifica el código e intenta nuevamente.',
    
    ALREADY_VALIDATED_TITLE: 'Recibo Ya Validado',
    ALREADY_VALIDATED_MESSAGE: 'Este recibo ya ha sido validado anteriormente.',
    
    CANNOT_VALIDATE_TITLE: 'No se Puede Validar',
    CANNOT_VALIDATE_MESSAGE: 'Este recibo no puede ser validado en este momento.',
    
    NETWORK_ERROR_TITLE: 'Error de Conexión',
    NETWORK_ERROR_MESSAGE: 'No se pudo conectar con el servidor.\n\nVerifica tu conexión a internet.',
    
    INVALID_AMOUNT_TITLE: 'Monto Inválido',
    INVALID_AMOUNT_MESSAGE: 'El monto del recibo no es válido.\n\nPor favor, intenta nuevamente.',
  },
  
  ACCESSIBILITY: {
    CLOSE_BUTTON: 'Cerrar recibo',
    SHARE_CODE: 'Compartir código de recibo',
    DOWNLOAD_PDF: 'Descargar recibo en PDF',
    GO_HOME: 'Ir a la pantalla de inicio',
    QR_CODE: 'Código QR del recibo',
    COPY_CODE: 'Copiar código de recibo',
  },
  
  FOOTER: {
    DISCLAIMER: 'Este es un comprobante de reserva de pedido',
    PAYMENT_NOTE: 'El pago debe realizarse en el local',
  },
} as const;

/**
 * Cash Receipt Status Display Text
 */
export const CASH_RECEIPT_STATUS = {
  pending: {
    text: 'Pendiente',
    color: '#F39C12',
    icon: 'time' as const,
  },
  validated: {
    text: 'Validado',
    color: '#27AE60',
    icon: 'checkmark-circle' as const,
  },
  expired: {
    text: 'Expirado',
    color: '#E74C3C',
    icon: 'close-circle' as const,
  },
  cancelled: {
    text: 'Cancelado',
    color: '#7F8C8D',
    icon: 'ban' as const,
  },
} as const;

/**
 * Cash Receipt Colors
 */
export const CASH_RECEIPT_COLORS = {
  PRIMARY: '#1B5E20',
  SUCCESS: '#27AE60',
  WARNING: '#F39C12',
  ERROR: '#E74C3C',
  INFO: '#3498DB',
  NEUTRAL: '#7F8C8D',
  
  BACKGROUND: {
    SUCCESS: '#D5F4E6',
    WARNING: '#FCF3CF',
    ERROR: '#FADBD8',
    INFO: '#D6EAF8',
  },
} as const;