import { Test, TestingModule } from '@nestjs/testing';
import { CashReceiptService } from './cash-receipt.service';

describe('CashReceiptService', () => {
  let service: CashReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashReceiptService],
    }).compile();

    service = module.get<CashReceiptService>(CashReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
