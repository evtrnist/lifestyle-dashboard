import { inject, Injectable } from '@angular/core';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';

@Injectable()
export class DashboardService {
  private readonly lifestyleConfigService = inject(
    LifestyleWidgetConfigService,
  );

  public readonly $config = this.lifestyleConfigService.$config;
}
