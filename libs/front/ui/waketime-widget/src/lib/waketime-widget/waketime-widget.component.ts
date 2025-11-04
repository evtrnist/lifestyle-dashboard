import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { WaketimeWidgetInput } from './waketime-widget-input';
import { WAKETIME_WIDGET_TOKEN } from './waketime-widget.token';
import { TimePipe } from '@lifestyle-dashboard/time-pipe';
import { TuiTime } from '@taiga-ui/cdk';

const GREY_COLOR = 'var(--tui-background-neutral-2)';
const ACTIVE_COLOR = 'var(--tui-chart-categorical-08)';

@Component({
  selector: 'lib-waketime-widget',
  imports: [TuiIcon, TimePipe],
  templateUrl: './waketime-widget.component.html',
  styleUrl: './waketime-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '$size()',
  },
})
export class WaketimeWidgetComponent {
  public widgetData = inject<Signal<WaketimeWidgetInput>>(WAKETIME_WIDGET_TOKEN);
  public readonly $size = computed(() => this.widgetData()?.size);

  public readonly $waketime = computed(
    () =>
    {
      const waketime = this.widgetData()?.data?.waketime;
      if (!waketime) {
        return null;
      }

      return new TuiTime(waketime['hours'], waketime['minutes']);
    }
  );

  public readonly $color = computed(() => this.widgetData()?.data?.waketime ? ACTIVE_COLOR : GREY_COLOR);
}
