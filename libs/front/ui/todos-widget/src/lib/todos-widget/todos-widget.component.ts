import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosWidgetInput } from './todos-widget-input';
import { TODOS_WIDGET_TOKEN } from './todos-widget.token';
import { TuiIcon } from '@taiga-ui/core';

const GREY_COLOR = 'var(--tui-background-neutral-2)';
const ACTIVE_COLOR = 'var(--tui-chart-categorical-10)';


@Component({
  selector: 'lifestyle-dashboard-todos-widget',
  imports: [TuiIcon],
  templateUrl: './todos-widget.component.html',
  styleUrl: './todos-widget.component.less',
})
export class TodosWidgetComponent {
    public widgetData = inject<Signal<TodosWidgetInput>>(TODOS_WIDGET_TOKEN);
  public readonly $size = computed(() => this.widgetData()?.size);

  public readonly $totalCount = computed(() => (this.widgetData()?.data?.todos?.additionCount || 0) + (this.widgetData()?.data?.todos?.completedCount || 0));

  public readonly $plannedCount = computed(() => this.widgetData()?.data?.todos?.plannedCount || 0);

  public readonly $additionCount = computed(() => this.widgetData()?.data?.todos?.additionCount || 0);

    public readonly $color = computed(() => this.widgetData()?.data?.todos ? ACTIVE_COLOR : GREY_COLOR);

    public readonly $totalRange = computed(() => Array(this.$totalCount()));

}
