import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    // Lee la API key de Stripe usando ConfigService
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    // Depuración: asegúrate que la clave sale en la consola y empieza con 'sk_'
    console.log('🔑 Stripe SECRET_KEY:', secretKey);

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY no está definida en el archivo .env');
    }

    // Instancia Stripe SDK con la versión que te pide tu node_modules
    this.stripe = new Stripe(secretKey, { apiVersion: '2025-09-30.clover' });
  }

  async createPaymentIntent(amount: number, currency: string = 'cop') {
    // Depuración: log cada vez que se crea un PaymentIntent
    console.log('🟢 createPaymentIntent called. Stripe key:', this.configService.get<string>('STRIPE_SECRET_KEY'));
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe requiere centavos
        currency,
        automatic_payment_methods: { enabled: true },
      });
      // Log del resultado para confirmar
      console.log('🟢 PaymentIntent creado:', paymentIntent.id);

      return { clientSecret: paymentIntent.client_secret };
    } catch (error: any) {
      // Log de error específico de Stripe
      console.error('🔴 Error creating PaymentIntent:', error);

      throw new Error(
        `Error creating payment intent: ${error.message || error}`
      );
    }
  }
}
