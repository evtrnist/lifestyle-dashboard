import { inject, Injectable } from '@angular/core';
import { Layout } from '@lifestyle-dashboard/config';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';

@Injectable({ providedIn: 'root' })
export class WidgetLayoutSettingsService {
  private readonly lifestyleWidgetConfigService = inject(LifestyleWidgetConfigService);

  public readonly $config = this.lifestyleWidgetConfigService.$config;

  public readonly $widgetConfigState = this.lifestyleWidgetConfigService.$state;

  public saveWidgetLayoutSettings(layout: Layout): void {
    const config = this.$config();

    if (!config) {
      this.lifestyleWidgetConfigService.createConfig({ layout });
      return;
    }

    this.lifestyleWidgetConfigService.updateConfig({ layout });
  }
}
