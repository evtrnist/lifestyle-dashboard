import { KeyValue, KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiLabel,
  TuiTextfield,
  TuiTextfieldDirective,
  TuiTextfieldDropdownDirective,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiChevron,
  TuiDataListWrapper,
  TuiSelect,
} from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { Layout } from '@lifestyle-dashboard/config';
import { State } from '@lifestyle-dashboard/state';
import {
  Slot,
  WidgetOptions,
  WidgetType,
} from '@lifestyle-dashboard/widget-contracts';
import { WidgetRegistry } from '@lifestyle-dashboard/widget-registry';
import { WidgetLayoutSettingsService } from './widget-layout-settings.service';
import { WIDGET_LAYOUT_SLOT_MAP } from './widget-layout-slots';

@Component({
  selector: 'app-widget-layout-settings',
  templateUrl: './widget-layout-settings.component.html',
  styleUrls: ['./widget-layout-settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KeyValuePipe,
    FormsModule,
    TuiTextfield,
    TuiDataListWrapper,
    TuiChevron,
    TuiLabel,
    TuiSelect,
    TuiTextfieldDirective,
    TuiTextfieldDropdownDirective,
    TuiButton,
    TuiHeader,
    TuiTitle,
    TuiButtonLoading,
  ],
})
export class WidgetLayoutSettingsComponent {
  private readonly widgetLayoutSettingsService = inject(
    WidgetLayoutSettingsService,
  );

  private readonly $config = this.widgetLayoutSettingsService.$config;

  protected readonly widgets = Object.values(WidgetRegistry);

  protected readonly $slotsMap = computed(() => {
    const base = structuredClone(
      WIDGET_LAYOUT_SLOT_MAP,
    ) as typeof WIDGET_LAYOUT_SLOT_MAP;
    const config = this.$config();
    const selectedWidget = this.$selectedWidget();

    if (config) {
      for (const [slot, widget] of Object.entries(config.layout)) {
        if (widget && base[slot as Slot]) {
          base[slot as Slot] = {
            ...base[slot as Slot],
            value: widget as WidgetType,
            label: WidgetRegistry[widget as WidgetType].label,
          };
        }
      }
    }

    if (selectedWidget) {
      const key = selectedWidget.slot;
      const prev = base[key];

      base[key] = {
        ...prev,
        value: selectedWidget.options ? selectedWidget.options.key : null,
        label: selectedWidget.options ? selectedWidget.options.label : '',
      };
    }

    return base;
  });

  protected readonly $shouldShowLoading = computed(() => {
    const state = this.widgetLayoutSettingsService.$widgetConfigState();

    return state === State.Loading;
  });

  public readonly stringify = (x: WidgetOptions): string => x.label;

  private readonly $selectedWidget = signal<{
    slot: Slot;
    options: WidgetOptions | null;
  } | null>(null);

  /**
   * Comparator to maintain insertion order in ngFor with KeyValuePipe.
   * Parameters are intentionally unused.
   */
  public readonly keepOrder = (
    _a: KeyValue<Slot, unknown>,
    _b: KeyValue<Slot, unknown>,
  ): number => {
    return 0;
  };

  public save(): void {
    const slots = this.$slotsMap();

    if (!slots) {
      return;
    }

    const layout: Layout = Object.entries(slots).reduce(
      (acc, [slot, widget]) => ({
        ...acc,
        [slot]: widget.value as WidgetType,
      }),
      {},
    ) as Layout;

    this.widgetLayoutSettingsService.saveWidgetLayoutSettings(layout);
  }

  public selectWidget(options: WidgetOptions | null, slot: Slot): void {
    console.log('Selected widget', options, 'for slot', slot);

    this.$selectedWidget.set({ slot, options });
  }
}
