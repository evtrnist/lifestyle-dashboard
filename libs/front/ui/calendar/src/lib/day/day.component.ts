import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChild,
  ViewContainerRef,
  Injector,
  inject,
  OnInit,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slot, Widget, WidgetRegistry } from '@lifestyle-dashboard/widget';
import { TimetrackerWidgetComponent } from '@lifestyle-dashboard/timetracker-widget';

@Component({
  selector: 'lifestyle-day',
  standalone: true,
  imports: [CommonModule, TimetrackerWidgetComponent],
  templateUrl: './day.component.html',
  styleUrl: './day.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayComponent implements OnInit {
  public readonly $day = input.required<Date | null>({ alias: 'day' });

  public readonly $widgets = input.required<Widget[]>({ alias: 'widgets' });

  public readonly $bottomRightContainerRef = viewChild(
    'bottomRightContainerRef',
    { read: ViewContainerRef }
  );

  public readonly $bottomRightSlotWidget = computed<Type<unknown> | null>(() => {
    const widgetType = this.$widgets().find(
      (widget) => widget.slot === Slot.BottomRight
    )?.widgetType;

    if (!widgetType) {
      return null;
    }

    return WidgetRegistry[widgetType];
  });

  private readonly injector = inject(Injector);

  ngOnInit(): void {
    this.$widgets().forEach((widget) => {
      console.log('widget', widget);
    });
  }
}
