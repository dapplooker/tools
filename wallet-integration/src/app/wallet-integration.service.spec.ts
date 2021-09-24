import { TestBed } from '@angular/core/testing';

import { WalletIntegrationService } from './wallet-integration.service';

describe('WalletIntegrationService', () => {
  let service: WalletIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
