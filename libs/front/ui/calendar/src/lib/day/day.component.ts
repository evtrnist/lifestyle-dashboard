import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Config } from '@lifestyle-dashboard/config';
import { Slot, WidgetOptions } from '@lifestyle-dashboard/widget-contracts';
import { WidgetRegistry } from '@lifestyle-dashboard/widget-registry';
import { DaySlotComponent } from './day-slot/day-slot.component';

@Component({
  selector: 'lifestyle-day',
  standalone: true,
  templateUrl: './day.component.html',
  styleUrl: './day.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DaySlotComponent],
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

  protected readonly Slot = Slot;
}
