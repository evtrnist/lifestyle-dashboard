import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  Injector,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiIconPipe, type TuiDialogContext } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { DayCardDialogService } from './day-card-dialog.service';
import {
  WidgetIconPipe,
  WidgetNamePipe,
} from '@lifestyle-dashboard/widget-name-pipe';
import { TIMETRACKER_WIDGET_TOKEN } from '@lifestyle-dashboard/timetracker-widget';
@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [CommonModule, TuiTabs, TuiIconPipe, WidgetNamePipe, WidgetIconPipe],
  templateUrl: './day-card-dialog.component.html',
  styleUrl: './day-card-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DayCardDialogService],
})
export class DayCardDialogComponent {
  private readonly dayCardDialogService = inject(DayCardDialogService);
  private readonly injector = inject(Injector);

  public readonly context = injectContext<TuiDialogContext<Date, Date>>();

  public readonly $tabs = this.dayCardDialogService.$tabs;

  public readonly $shownWidget = computed(() => {
    const widgetOptions = this.dayCardDialogService.$widgetOptions();

    console.log(widgetOptions);

    const index = this.activeItemIndex;

    if (index < 0 || index >= widgetOptions.length) {
      return null;
    }

    return widgetOptions[index];
  });

  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log(item);
  }

  protected createInjector(token: InjectionToken<unknown>): Injector {
    return Injector.create({
      providers: [
        {
          provide: token,
          useValue: {
            size: 'xl',
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
