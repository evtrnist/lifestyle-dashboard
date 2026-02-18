import { Component, computed, inject, Signal } from '@angular/core';
import { TuiHint } from '@taiga-ui/core';
import { CaloriesWidgetInput } from './calories-widget-input';
import { CALORIES_WIDGET_TOKEN } from './calories-widget.token';

const CALORIES_BASE = 1650;

@Component({
  selector: 'lifestyle-dashboard-calories-widget',
  imports: [TuiHint],
  templateUrl: './calories-widget.component.html',
  styleUrl: './calories-widget.component.less',
})
export class CaloriesWidgetComponent {
  public readonly widgetData = inject<Signal<CaloriesWidgetInput>>(CALORIES_WIDGET_TOKEN);

  public readonly $size = computed(() => this.widgetData()?.size);

  public readonly $caloriesData = computed(() => this.widgetData()?.data);

  public readonly $caloriesColor = computed(() => {
    const caloriesData = this.$caloriesData();
    if (!caloriesData) {
      return '';
    }

    const { eaten, burned } = caloriesData;

    return eaten - burned > CALORIES_BASE ? 'red' : 'green';
  });
}
