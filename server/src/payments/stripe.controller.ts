import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('payments')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  @HttpCode(HttpStatus.OK)
  async createPaymentIntent(
    @Body() body: { amount: number; currency?: string },
  ) {
    const { amount, currency = 'cop' } = body;
    
    if (!amount || amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }

    return await this.stripeService.createPaymentIntent(amount, currency);
  }
}
