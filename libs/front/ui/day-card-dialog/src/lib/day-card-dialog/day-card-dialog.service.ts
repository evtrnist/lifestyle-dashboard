import { computed, inject, Injectable } from '@angular/core';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { WidgetRegistry } from '@lifestyle-dashboard/widget-registry';

@Injectable()
export class DayCardDialogService {
  private readonly configService = inject(LifestyleWidgetConfigService);

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

  public save(): void {
    //
  }
}
