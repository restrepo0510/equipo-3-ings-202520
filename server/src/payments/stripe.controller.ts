import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // Endpoint: POST /payments/create-payment-intent
  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency?: string }
  ) {
    // Log para debug en consola del backend
    console.log('🔔 StripeController: recibido POST /payments/create-payment-intent', body);

    // Llama al servicio que realmente crea el PaymentIntent en Stripe y retorna el clientSecret
    return await this.stripeService.createPaymentIntent(body.amount, body.currency ?? 'cop');
  }
}
