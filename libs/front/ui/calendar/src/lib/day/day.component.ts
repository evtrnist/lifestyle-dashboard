import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  viewChild,
  ViewContainerRef,
  Injector,
  inject,
  Type,
  InjectionToken,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slot, WidgetOptions, WidgetRegistry } from '@lifestyle-dashboard/widget';
import { Config } from '@lifestyle-dashboard/config';

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

  public readonly $config = input.required<Config | null>({ alias: 'config' }); // Сигнал для конфига

  public readonly $bottomRightContainerRef = viewChild(
    'bottomRightContainerRef',
    { read: ViewContainerRef }
  );

  public readonly $bottomMiddleSlotWidgetOptions = computed<WidgetOptions | null>(
    () => {
      const config = this.$config();

      if (!config) {
        return null;
      }

      const widgetType = config.layout[Slot.BottomMiddle];

      return widgetType ? WidgetRegistry[widgetType] : null;
    }
  );

  private readonly injector = inject(Injector);

  public createInjector(token: InjectionToken<unknown>): Injector {
    return Injector.create({
      providers: [
        { 
          provide: token,
          useValue: '' 
        }
      ],
      parent: this.injector  
    });
  }
}
