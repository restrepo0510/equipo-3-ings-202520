// components/ui/CustomAlert.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/CustomAlert.styles';

export type AlertType = 'success' | 'error' | 'warning' | 'confirm' | 'info';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface CustomAlertProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
}

/**
 * CustomAlert Component
 * 
 * A beautiful, themed alert component that replaces React Native's Alert
 * Supports success, error, warning, confirm, and info types
 */
export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  type = 'info',
  title,
  message,
  buttons = [{ text: 'OK', style: 'default' }],
  onDismiss,
}) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [visible]);

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          name: 'checkmark-circle' as const,
          color: '#27AE60',
          bgColor: '#D5F4E6',
        };
      case 'error':
        return {
          name: 'close-circle' as const,
          color: '#E74C3C',
          bgColor: '#FADBD8',
        };
      case 'warning':
        return {
          name: 'warning' as const,
          color: '#F39C12',
          bgColor: '#FCF3CF',
        };
      case 'confirm':
        return {
          name: 'help-circle' as const,
          color: '#3498DB',
          bgColor: '#D6EAF8',
        };
      default:
        return {
          name: 'information-circle' as const,
          color: '#556B2F',
          bgColor: '#DCE4D0',
        };
    }
  };

  const iconConfig = getIconConfig();

  const handleButtonPress = (button: AlertButton) => {
    button.onPress?.();
    onDismiss?.();
  };

  const getButtonStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'cancel':
        return styles.cancelButton;
      case 'destructive':
        return styles.destructiveButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (buttonStyle?: string) => {
    switch (buttonStyle) {
      case 'cancel':
        return styles.cancelButtonText;
      case 'destructive':
        return styles.destructiveButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={onDismiss}
        />
        
        <Animated.View
          style={[
            styles.alertContainer,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: iconConfig.bgColor }]}>
            <Ionicons name={iconConfig.name} size={48} color={iconConfig.color} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          {message && <Text style={styles.message}>{message}</Text>}

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  getButtonStyle(button.style),
                  buttons.length === 1 && styles.singleButton,
                ]}
                onPress={() => handleButtonPress(button)}
                activeOpacity={0.8}
              >
                <Text style={getButtonTextStyle(button.style)}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

/**
 * CustomAlert Helper Functions
 * Similar API to React Native's Alert
 */
export class CustomAlertHelper {
  private static currentAlert: {
    show: (props: CustomAlertProps) => void;
    hide: () => void;
  } | null = null;

 static setAlertRef(ref: any) {
  console.log('🔔 Alert ref set:', !!ref);
  this.currentAlert = ref;
}

  static alert(
    title: string,
    message?: string,
    buttons?: AlertButton[],
    type: AlertType = 'info'
  ) {
    console.log('🔔 Showing alert:', { title, alertRef: !!this.currentAlert });
  if (!this.currentAlert) {
    console.error('❌ Alert ref not initialized!');
    return;
  }
    this.currentAlert?.show({
      visible: true,
      title,
      message,
      buttons: buttons || [{ text: 'OK', style: 'default' }],
      type,
    });
  }

  static success(title: string, message?: string, onPress?: () => void) {
    this.alert(title, message, [{ text: 'OK', onPress }], 'success');
  }

  static error(title: string, message?: string, onPress?: () => void) {
    this.alert(title, message, [{ text: 'OK', onPress }], 'error');
  }

  static confirm(
    title: string,
    message?: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) {
    this.alert(
      title,
      message,
      [
        { text: 'Cancelar', style: 'cancel', onPress: onCancel },
        { text: 'Confirmar', style: 'default', onPress: onConfirm },
      ],
      'confirm'
    );
  }

  static warning(title: string, message?: string, onPress?: () => void) {
    this.alert(title, message, [{ text: 'OK', onPress }], 'warning');
  }
}