// context/AlertProvider.tsx
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { CustomAlert, CustomAlertProps, CustomAlertHelper } from '@/components/ui/CustomAlert';

interface AlertProviderProps {
  children: React.ReactNode;
}

/**
 * AlertProvider
 * 
 * Wraps the app to provide global alert functionality
 */
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<CustomAlertProps>({
    visible: false,
    title: '',
  });

  const alertRef = useRef({
    show: (props: CustomAlertProps) => {
      setAlertProps({ ...props, visible: true });
    },
    hide: () => {
      setAlertProps(prev => ({ ...prev, visible: false }));
    },
  });

  React.useEffect(() => {
    CustomAlertHelper.setAlertRef(alertRef.current);
  }, []);

  const handleDismiss = () => {
    setAlertProps(prev => ({ ...prev, visible: false }));
    alertProps.onDismiss?.();
  };

  return (
    <>
      {children}
      <CustomAlert
        {...alertProps}
        onDismiss={handleDismiss}
      />
    </>
  );
};