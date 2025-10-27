import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  Injector,
  signal,
  Type,
  viewChild,
  ViewContainerRef,
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
import { WidgetSettingsComponent, WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { DynamicHostComponent } from '@lifestyle-dashboard/dynamic-host';

function isWidgetSettingsComponent(x: unknown): x is WidgetSettingsComponent {
  return typeof x === 'object' && x !== null && 'form' in x;
}

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

  public readonly context = injectContext<TuiDialogContext<Date, Date>>();

  protected readonly settingsContainerRef = viewChild('settingsContainerRef', {
    read: ViewContainerRef,
  });

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

  private readonly settingsInstance = signal<WidgetSettingsComponent | null>(
    null,
  );

  private injectorCache?: Injector;
  private lastToken?: InjectionToken<unknown>;

  protected onClick(item: string): void {
    console.log(item);
  }

  protected save(widgetType: WidgetType): void {
    const form = this.settingsInstance()?.form;

    if (!form || form.invalid) {
      return;
    }

    console.log('Save settings for', form.value);

    this.dayCardDialogService.save(this.context.data, widgetType, form.value);
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
