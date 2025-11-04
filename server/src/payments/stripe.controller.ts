import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency?: string }
  ) {
    // Aquí puedes agregar un log de debug si lo deseas
    console.log('🔔 StripeController: recibido POST /payments/create-payment-intent', body);

    return await this.stripeService.createPaymentIntent(body.amount, body.currency);
  }
}
