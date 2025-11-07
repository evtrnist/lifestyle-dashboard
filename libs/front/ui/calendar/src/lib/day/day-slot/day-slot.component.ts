import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { DynamicHostComponent } from '@lifestyle-dashboard/dynamic-host';
import { DayWidgetData } from '@lifestyle-dashboard/lifestyle-widget-data-service';
import { TimeTrackerWidgetInput } from '@lifestyle-dashboard/timetracker-widget';
import { WidgetOptions } from '@lifestyle-dashboard/widget-contracts';

@Component({
  selector: 'lifestyle-day-slot',
  templateUrl: './day-slot.component.html',
  styleUrl: './day-slot.component.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DynamicHostComponent],
})
export class DaySlotComponent {
  private readonly injector = inject(Injector);

  public readonly $widget = input.required<WidgetOptions | null>({ alias: 'widget' });

  public readonly $dayData = input.required<DayWidgetData | null>({ alias: 'dayData' });

  protected readonly $widgetInjector = computed<Injector | null>(() => {
    const widget = this.$widget();

    if (!widget) {
      return null;
    }

    const dayData = this.$dayData();
    const data = dayData ? dayData[widget.key] : {};

    return Injector.create({
      providers: [
        {
          provide: widget.token,
          useFactory: () =>
            signal<TimeTrackerWidgetInput>({
              size: 's',
              data,
            }),
        },
      ],
      parent: this.injector,
    });
  });
}
