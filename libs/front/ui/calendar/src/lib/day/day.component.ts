import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Injector,
  inject,
  InjectionToken,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slot, WidgetOptions } from '@lifestyle-dashboard/widget-contracts';
import { WidgetRegistry } from '@lifestyle-dashboard/widget-registry';
import { Config } from '@lifestyle-dashboard/config';
import { TIMETRACKER_WIDGET_TOKEN } from '@lifestyle-dashboard/timetracker-widget';
import { DynamicHostComponent } from '@lifestyle-dashboard/dynamic-host';

@Component({
  selector: 'lifestyle-day',
  standalone: true,
  imports: [CommonModule, DynamicHostComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent {
  public readonly $day = input.required<Date | null>({ alias: 'day' });

  public readonly $config = input.required<Config | null>({ alias: 'config' });

  public readonly $slotWidgetMap = computed<Record<Slot, WidgetOptions | null>>(() => {
    const config = this.$config();
    const map: Record<Slot, WidgetOptions | null> = {
      [Slot.TopLeft]: null,
      [Slot.TopMiddle]: null,
      [Slot.TopRight]: null,
      [Slot.MiddleLeft]: null,
      [Slot.Middle]: null,
      [Slot.MiddleRight]: null,

      [Slot.BottomLeft]: null,
      [Slot.BottomMiddle]: null,
      [Slot.BottomRight]: null,
    };

    if (config) {
      (Object.keys(config.layout) as Slot[]).forEach((slot) => {
        const widgetType = config.layout[slot];
        map[slot] = widgetType ? WidgetRegistry[widgetType] : null;
      });
    }

    return map;
  });

  private readonly injector = inject(Injector);

  protected readonly Slot = Slot;

  public createInjector(token: InjectionToken<unknown>): Injector {
    return Injector.create({
      providers: [
        {
          provide: token,
          useValue: {
            size: 's',
            timeData: {
              routine: 3780,
              health: 31680,
              selfDevelopment: 21240,
              leisure: 29580,
            },
          },
        },
      ],
      parent: this.injector,
    });
  }
}
