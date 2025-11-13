
import { View } from 'react-native';

/**
 * Este es el archivo de entrada (ruta raíz /).
 * No muestra nada a propósito.
 * El NavigationGuard en app/_layout.tsx lo interceptará
 * y redirigirá al Login o al Home.
 */
export default function Index() {
  return <View />;
}