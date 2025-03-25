import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Injector,
  inject,
  InjectionToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Slot,
  WidgetOptions,
  WidgetRegistry,
} from '@lifestyle-dashboard/widget';
import { Config } from '@lifestyle-dashboard/config';
import { TIMETRACKER_WIDGET_TOKEN } from '@lifestyle-dashboard/timetracker-widget';

@Component({
  selector: 'lifestyle-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent {
  public readonly $day = input.required<Date | null>({ alias: 'day' });

  public readonly $config = input.required<Config | null>({ alias: 'config' });

  public readonly $bottomMiddleSlotWidgetOptions =
    computed<WidgetOptions | null>(() => {
      const config = this.$config();

      if (!config) {
        return null;
      }

      const widgetType = config.layout[Slot.BottomMiddle];

      return widgetType ? WidgetRegistry[widgetType] : null;
    });

  private readonly injector = inject(Injector);

  public createInjector(token: InjectionToken<unknown>): Injector {
    return Injector.create({
      providers: [
        {
          provide: TIMETRACKER_WIDGET_TOKEN,
          useValue: {
            size: 's',
            routine: 3780,
            health: 31680,
            selfDevelopment: 21240,
            leisure: 29580,
          },
        },
      ],
      parent: this.injector,
    });
  }
}
