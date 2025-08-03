import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Slot,
  WidgetOptions,
  WidgetRegistry,
  WidgetType,
} from '@lifestyle-dashboard/widget';
import {
  TuiButton,
  TuiLabel,
  TuiTextfield,
  TuiTextfieldDirective,
  TuiTextfieldDropdownDirective,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import {
  WIDGET_LAYOUT_SLOT_MAP,
  WidgetLayoutSlot,
} from './widget-layout-slots';
import { KeyValuePipe } from '@angular/common';
import { TuiHeader } from '@taiga-ui/layout';
import { WidgetLayoutSettingsService } from './widget-layout-settings.service';
import { Layout } from '@lifestyle-dashboard/config';
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
  ],
})
export class WidgetLayoutSettingsComponent {
  private readonly widgetLayoutSettingsService = inject(
    WidgetLayoutSettingsService,
  );

  private readonly $config = this.widgetLayoutSettingsService.$config;

  protected readonly widgetType = WidgetType;

  protected readonly widgets = Object.values(WidgetRegistry);

  protected readonly $slotsMap = signal(WIDGET_LAYOUT_SLOT_MAP);

  public readonly $currentWidgetLayoutSettings = computed<
    Record<Slot, WidgetLayoutSlot>
  >(() => {
    const slotsMap = this.$slotsMap();
    const config = this.$config();

    if (!config) {
      return slotsMap;
    }

    Object.entries(config?.layout).forEach(([slot, widget]) => {
      if (slotsMap[slot as Slot] && widget) {
        slotsMap[slot as Slot].value = widget;
        slotsMap[slot as Slot].label =
          WidgetRegistry[widget as WidgetType].label;
      }
    });

    return slotsMap;
  });


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

  public selectWidget({ key }: WidgetOptions, slot: string) {
    this.$slotsMap.update((slots) => {
      const currentSlot = slots[slot as Slot];
      if (currentSlot) {
        currentSlot.value = key;
        currentSlot.label = WidgetRegistry[key].label;
      }
      return { ...slots };
    });
  }
}
