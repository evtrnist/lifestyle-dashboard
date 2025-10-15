import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiIconPipe, type TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiTabs } from '@taiga-ui/kit';
import { DayCardDialogService } from './day-card-dialog.service';
import {
  WidgetIconPipe,
  WidgetNamePipe,
} from '@lifestyle-dashboard/widget-name-pipe';

@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabs,
    TuiIconPipe,
    TuiButton,
    WidgetNamePipe,
    WidgetIconPipe,
  ],
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

    console.log('Widget options:', widgetOptions);

    const index = this.activeItemIndex;

    if (index < 0 || index >= widgetOptions.length) {
      return null;
    }

    return { ...widgetOptions[index] };
  });

  protected activeItemIndex = 0;

  private injectorCache?: Injector;
  private lastToken?: InjectionToken<unknown>;

  protected onClick(item: string): void {
    console.log(item);
  }

  protected save(settingsComponent?: Type<unknown>): void {
    if (!settingsComponent) {
      return;
    }
    console.log('Save settings for', settingsComponent);

    
  }

  public createInjector(token: InjectionToken<unknown>): Injector {
    // Если токен не меняется, возвращаем старый инжектор
    if (this.lastToken === token && this.injectorCache) {
      return this.injectorCache;
    }

    this.lastToken = token;
    this.injectorCache = Injector.create({
      providers: [
        {
          provide: token,
          useValue: {
            size: 'xl',
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

    return this.injectorCache;
  }
}
