import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    // Lee la clave secreta del archivo .env
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    // Log para verificar la clave
    console.log('🔑 Stripe SECRET_KEY:', secretKey);

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY no está definida en el archivo .env');
    }

    // Inicializa Stripe SDK con la versión correcta
    this.stripe = new Stripe(secretKey, { apiVersion: '2025-09-30.clover' });
  }

  async createPaymentIntent(amount: number, currency: string = 'cop') {
    // Stripe espera el monto en centavos, asegúrate que frontend o backend envíe correcto
    const amountInCents = Math.round(amount * 100); // Ajusta si tu frontend ya multiplica por 100

    console.log('🟢 createPaymentIntent called. Amount:', amountInCents, 'Currency:', currency);

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        automatic_payment_methods: { enabled: true },
      });

      console.log('🟢 PaymentIntent creado:', paymentIntent.id);

      return { clientSecret: paymentIntent.client_secret };
    } catch (error: any) {
      console.error('🔴 Error creating PaymentIntent:', error);

      throw new Error(
        `Error creating payment intent: ${error.message || error}`
      );
    }
  }
}
