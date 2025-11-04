import { Slot } from 'expo-router';
import { StripeProvider } from '@stripe/stripe-react-native';

// Reemplaza con tu clave pública de Stripe (pk_test_...)
const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_tu_clave_publica_aqui';

export default function App() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <Slot />
    </StripeProvider>
  );
}
