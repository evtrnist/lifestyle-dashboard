import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  WidgetOptions,
  WidgetRegistry,
  WidgetType,
} from '@lifestyle-dashboard/widget';
import { TuiLabel, TuiSelect, TuiTextfield, TuiTextfieldDirective, TuiTextfieldDropdownDirective } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiSelectComponent, TuiSelectDirective, TuiSelectModule } from '@taiga-ui/legacy';
@Component({
  selector: 'app-widget-layout-settings',
  templateUrl: './widget-layout-settings.component.html',
  styleUrls: ['./widget-layout-settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    TuiTextfield,
    TuiDataListWrapper,
    TuiChevron,
    TuiLabel,
    TuiSelectModule,
    TuiTextfieldDirective,
    TuiTextfieldDropdownDirective
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

  items = Object.values(WidgetRegistry);

  protected readonly stringify = (widget: WidgetOptions) => widget.label;
}
