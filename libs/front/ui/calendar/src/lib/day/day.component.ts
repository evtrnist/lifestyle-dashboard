import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  Injector,
  inject,
  InjectionToken,
  signal,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Slot, WidgetOptions, WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { WidgetRegistry } from '@lifestyle-dashboard/widget-registry';
import { Config } from '@lifestyle-dashboard/config';
import { DynamicHostComponent } from '@lifestyle-dashboard/dynamic-host';
import { Observable, of } from 'rxjs';
import { TimeTrackerWidgetInput } from 'libs/front/ui/timetracker-widget/src/lib/timetracker-widget/timetracker-widget-input';

@Component({
  selector: 'lifestyle-day',
  standalone: true,
  imports: [AsyncPipe, DynamicHostComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent {
  public readonly $day = input.required<Date | null>({ alias: 'day' });

  public readonly $config = input.required<Config | null>({ alias: 'config' });

  public readonly $dayData = input.required<Record<string, any> | null>({ alias: 'dayData' });

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

  public createInjector(token: InjectionToken<WidgetType>, key: WidgetType): Injector {
    const dayData = this.$dayData();

    const data = dayData ? dayData[key] : {};

    if (data === '2025-10-01') {
      console.log('Creating injector for token:', key, 'with data:', data);
    }

    return Injector.create({
      providers: [
        {
          provide: token,
          useFactory: () => signal<TimeTrackerWidgetInput>({
          size: 's',
          data,
        })
        },
      ],
      parent: this.injector,
    });
  }
}
