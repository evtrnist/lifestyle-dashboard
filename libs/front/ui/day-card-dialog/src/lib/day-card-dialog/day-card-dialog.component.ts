import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  Injector,
  signal,
  Type,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TuiButton, TuiIconPipe, type TuiDialogContext } from '@taiga-ui/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiTabs } from '@taiga-ui/kit';
import { DayCardDialogService } from './day-card-dialog.service';
import {
  WidgetIconPipe,
  WidgetNamePipe,
} from '@lifestyle-dashboard/widget-name-pipe';
import { WidgetSettingsComponent, WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { DynamicHostComponent } from '@lifestyle-dashboard/dynamic-host';
import { TimeTrackerWidgetInput } from 'libs/front/ui/timetracker-widget/src/lib/timetracker-widget/timetracker-widget-input';

function isWidgetSettingsComponent(x: unknown): x is WidgetSettingsComponent {
  return typeof x === 'object' && x !== null && 'form' in x;
}

export interface DayCardDialogContext {
  date: Date;
  calendarData: Record<string, Record<WidgetType, any>>; // to do
}

@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    TuiTabs,
    TuiIconPipe,
    TuiButton,
    WidgetNamePipe,
    WidgetIconPipe,
    DynamicHostComponent,
  ],
  templateUrl: './day-card-dialog.component.html',
  styleUrl: './day-card-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DayCardDialogService],
})
export class DayCardDialogComponent {
  private readonly dayCardDialogService = inject(DayCardDialogService);
  private readonly injector = inject(Injector);

  public readonly context = injectContext<TuiDialogContext<DayCardDialogContext, DayCardDialogContext>>();

  public readonly $tabs = this.dayCardDialogService.$tabs;

  public readonly date = this.context.data.date;
  public readonly calendarData = this.context.data.calendarData;

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

  private readonly settingsInstance = signal<WidgetSettingsComponent | null>(
    null,
  );

  private injectorCache?: Injector;
  private lastToken?: InjectionToken<unknown>;

    protected readonly $widgetInjector = computed<Injector | null>(() => {
    const widget = this.$shownWidget();

    if (!widget) {
      return null;
    }

    const dayData = this.date.toLocaleDateString('sv-SE');

    const data = this.calendarData?.[dayData]?.[widget.key] ?? null;


    return Injector.create({
      providers: [
        {
          provide: widget.token,
          useFactory: () =>
            signal<TimeTrackerWidgetInput>({
              size: 'xl',
              data,
            }),
        },
      ],
      parent: this.injector,
    });
  });

  protected onClick(item: string): void {
    console.log(item);
  }

  protected save(widgetType: WidgetType): void {
    const form = this.settingsInstance()?.form;

    if (!form || form.invalid) {
      return;
    }

    console.log('Save settings for', form.value, this.date, widgetType);

    this.dayCardDialogService.save(this.date, widgetType, form.value);
  }

  protected onSettingsInit(instance: unknown) {
    if (isWidgetSettingsComponent(instance)) {
      this.settingsInstance.set(instance);
    } else {
      console.warn('Got incompatible instance:', instance);
    }
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
            data: {
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
