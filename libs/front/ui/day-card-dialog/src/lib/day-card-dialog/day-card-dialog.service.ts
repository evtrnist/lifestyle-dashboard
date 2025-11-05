import { computed, inject, Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { toLocalIsoString } from '@lifestyle-dashboard/day-data';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';
import { LifestyleWidgetDataService } from '@lifestyle-dashboard/lifestyle-widget-data-service';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { WidgetRegistry } from '@lifestyle-dashboard/widget-registry';

@Injectable()
export class DayCardDialogService {
  private readonly configService = inject(LifestyleWidgetConfigService);
  private readonly lifestyleWidgetDataService = inject(LifestyleWidgetDataService);

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

    console.log('config in widgetOptions:', config);

    if (!config) {
      return [];
    }

    return Object.values(config.layout)
      .map((widgetType: WidgetType) => {
        return widgetType ? WidgetRegistry[widgetType] : null;
      })
      .filter(tuiIsPresent);
  });

  public save(date: Date, widgetType: WidgetType, data: unknown): void {
    console.log('Saving data for', { date: date.toLocaleDateString('sv-SE'), widgetType, data });

    this.lifestyleWidgetDataService
      .saveDateData$(date.toLocaleDateString('sv-SE'), widgetType, data)
      .pipe(
        tap(() => {
          console.log('Data saved successfully');
        }),
        catchError((error) => {
          console.error('Error saving data:', error);
          return of(null);
        }),
      )
      .subscribe();
  }
}
