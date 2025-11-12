import { Test, TestingModule } from '@nestjs/testing';
import { CashReceiptController } from './cash-receipt.controller';

describe('CashReceiptController', () => {
  let controller: CashReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashReceiptController],
    }).compile();

    controller = module.get<CashReceiptController>(CashReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
