import { computed, inject, Injectable } from '@angular/core';
import { LifestyleConfigService } from '@lifestyle-dashboard/lifestyle-config-service';
import { WidgetRegistry, WidgetType } from '@lifestyle-dashboard/widget';
import { tuiIsPresent } from '@taiga-ui/cdk';

@Injectable()
export class DayCardDialogService {
  private readonly configService = inject(LifestyleConfigService);

  public readonly $config = this.configService.$config;

  public readonly $tabs = computed(() => {
    const config = this.$config();

    if (!config) {
      return [];
    }
    return Object.values(config.layout).filter(tuiIsPresent);
  });

  public readonly $widgetOptions = computed(() => {
    const config = this.$config();

    if (!config) {
      return [];
    }

    return Object.values(config.layout)
      .map((widgetType: WidgetType) => {
        return widgetType ? WidgetRegistry[widgetType] : null;
      })
      .filter(tuiIsPresent);
  });
}
