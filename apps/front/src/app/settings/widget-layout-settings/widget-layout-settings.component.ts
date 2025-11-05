import { KeyValue, KeyValuePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
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
import { TuiButtonLoading, TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { TuiHeader } from '@taiga-ui/layout';
import { Layout } from '@lifestyle-dashboard/config';
import { State } from '@lifestyle-dashboard/state';
import { Slot, WidgetOptions, WidgetType } from '@lifestyle-dashboard/widget-contracts';
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
export class WidgetLayoutSettingsComponent implements OnInit {
  private readonly widgetLayoutSettingsService = inject(WidgetLayoutSettingsService);

  private readonly $config = this.widgetLayoutSettingsService.$config;

  protected readonly widgetType = WidgetType;

  protected readonly widgets = Object.values(WidgetRegistry);

  protected readonly $slotsMap = signal(WIDGET_LAYOUT_SLOT_MAP);

  protected readonly $shouldShowLoading = computed(() => {
    const state = this.widgetLayoutSettingsService.$widgetConfigState();

    return state === State.Loading;
  });

  public readonly stringify = (x: WidgetOptions) => x.label;

  public readonly keepOrder = (
    a: KeyValue<string, unknown>,
    b: KeyValue<string, unknown>,
  ): number => {
    return 0;
  };

  ngOnInit(): void {
    this.setConfigData();
  }

  public save() {
    const layout: Layout = Object.entries(this.$slotsMap()).reduce(
      (acc, [slot, widget]) => ({
        ...acc,
        [slot]: widget.value as WidgetType,
      }),
      {},
    ) as Layout;

    this.widgetLayoutSettingsService.saveWidgetLayoutSettings(layout);
  }

  public selectWidget(options: WidgetOptions | null, slot: string) {
    console.log('Selected widget', options, 'for slot', slot);
    this.$slotsMap.update((slots) => {
      const key = slot as Slot;

      const next = {
        ...slots[key],
        value: options === null ? null : options.key,
        label: options === null ? '' : options.label,
      };

      console.log('Next slot value:', next);

      console.log('Updated slots:', { ...slots, [key]: { ...next } });

      return { ...slots, [key]: { ...next } };
    });
  }

  private setConfigData() {
    const slotsMap = this.$slotsMap();
    const config = this.$config();

    const updated = {
      ...slotsMap,
    };

    if (!config) {
      return;
    }

    Object.entries(config?.layout).forEach(([slot, widget]) => {
      console.log('Config layout entry:', { slot, widget });
      if (slotsMap[slot as Slot] && widget) {
        updated[slot as Slot].value = widget;
        updated[slot as Slot].label = WidgetRegistry[widget as WidgetType].label;
      }
    });

    this.$slotsMap.set(updated);
  }
}
