import { inject, Injectable} from '@angular/core';
import { LifestyleConfigService } from '@lifestyle-dashboard/lifestyle-config-service';

@Injectable()
export class DashboardService {
  private readonly lifestyleConfigService = inject(LifestyleConfigService);

  public readonly $config = this.lifestyleConfigService.$config;
  
  public init() {
    this.lifestyleConfigService.init();
  }
}
