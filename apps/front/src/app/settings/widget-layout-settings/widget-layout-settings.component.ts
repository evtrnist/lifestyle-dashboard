import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
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
import {
  TuiChevron,
  TuiDataListWrapper,
  tuiItemsHandlersProvider,
  TuiSelect,
} from '@taiga-ui/kit';
import {
  WIDGET_LAYOUT_SLOT_MAP,
  WidgetLayoutSlot,
} from './widget-layout-slots';
import { KeyValuePipe } from '@angular/common';
import { TuiHeader } from '@taiga-ui/layout';
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
  providers: [
    tuiItemsHandlersProvider({
      stringify: (widget: WidgetOptions) => widget.label,
      identityMatcher: (a: WidgetOptions, b: WidgetOptions) =>
        a.label === b.label,
    }),
  ],
})
export class WidgetLayoutSettingsComponent {
  protected readonly widgetType = WidgetType;

  value = '';

  protected readonly widgets = Object.values(WidgetRegistry);

  protected readonly SLOTS_MAP = WIDGET_LAYOUT_SLOT_MAP;

  protected readonly stringify = (widget: WidgetOptions) => widget.label;

  public save() {
    console.log(this.SLOTS_MAP);
  }

  public selectWidget({ key }: WidgetOptions, slot: WidgetLayoutSlot) {
    slot.value = key;
  }
}
