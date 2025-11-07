import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  Injector,
  Signal,
  signal,
} from '@angular/core';
import { TuiButton, TuiIconPipe, type TuiDialogContext } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import { DynamicHostComponent } from '@lifestyle-dashboard/dynamic-host';
import { DayWidgetData } from '@lifestyle-dashboard/lifestyle-widget-data-service';
import { TimeTrackerWidgetInput } from '@lifestyle-dashboard/timetracker-widget';
import {
  WidgetSettingsComponent,
  WidgetType,
} from '@lifestyle-dashboard/widget-contracts';
import {
  WidgetIconPipe,
  WidgetNamePipe,
} from '@lifestyle-dashboard/widget-name-pipe';
import { DayCardDialogService } from './day-card-dialog.service';

function isWidgetSettingsComponent(x: unknown): x is WidgetSettingsComponent {
  return typeof x === 'object' && x !== null && 'form' in x;
}

export interface DayCardDialogContext {
  date: Date;
  calendarData: Record<string, DayWidgetData>;
}

@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [
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

  public readonly context =
    injectContext<
      TuiDialogContext<DayCardDialogContext, DayCardDialogContext>
    >();

  public readonly $tabs = this.dayCardDialogService.$tabs;

  public readonly date = this.context.data.date;
  public readonly calendarData = this.context.data.calendarData;

  public readonly $shownWidget = computed(() => {
    const widgetOptions = this.dayCardDialogService.$widgetOptions();

    const index = this.$activeItemIndex();

    console.log('Widget options:', widgetOptions, index);

    if (index < 0 || index >= widgetOptions.length) {
      return null;
    }

    console.log('Shown widget:', widgetOptions[index]);

    return { ...widgetOptions[index] };
  });

  protected readonly $activeItemIndex = signal(0);

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
          useFactory: (): Signal<unknown> => // to do: make more generic
            signal<unknown>({
              size: 'xl',
              data,
            }),
        },
      ],
      parent: this.injector,
    });
  });

  protected onClick(index: number): void {
    this.$activeItemIndex.set(index);
  }

  protected save(widgetType: WidgetType): void {
    const form = this.settingsInstance()?.form;

    if (!form || form.invalid) {
      return;
    }

    this.dayCardDialogService.save(this.date, widgetType, form.value);
  }

  protected onSettingsInit(instance: unknown): void {
    if (isWidgetSettingsComponent(instance)) {
      this.settingsInstance.set(instance);
    } else {
      console.warn('Got incompatible instance:', instance);
    }
  }
}
