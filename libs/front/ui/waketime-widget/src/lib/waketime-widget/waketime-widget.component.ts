import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { WaketimeWidgetInput } from './waketime-widget-input';
import { WAKETIME_WIDGET_TOKEN } from './waketime-widget.token';

@Component({
  selector: 'lib-waketime-widget',
  imports: [TuiIcon],
  templateUrl: './waketime-widget.component.html',
  styleUrl: './waketime-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaketimeWidgetComponent {
  public widgetData = inject<Signal<WaketimeWidgetInput>>(WAKETIME_WIDGET_TOKEN);
    public readonly $size = computed(() => this.widgetData()?.size);
  
    public readonly $waketime = computed(() => this.widgetData()?.data?.waketime); 
}
