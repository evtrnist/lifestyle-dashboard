import { Component, computed, inject, Signal } from '@angular/core';
import { TuiIcon } from '@taiga-ui/core';
import { TodosWidgetInput } from './todos-widget-input';
import { TODOS_WIDGET_TOKEN } from './todos-widget.token';

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

  public readonly $totalCount = computed(() => {
    const additionCount = this.$additionCount();
    const completedCount = this.$completedCount();

    return (additionCount ?? 0) + (completedCount ?? 0);
  });

  public readonly $plannedCount = computed(() => this.widgetData()?.data?.plannedCount ?? 0);

  public readonly $additionCount = computed(() => this.widgetData()?.data?.additionCount ?? 0);

  public readonly $completedCount = computed(() => this.widgetData()?.data?.completedCount ?? 0);

  public readonly $color = computed(() => (this.widgetData()?.data ? ACTIVE_COLOR : GREY_COLOR));

  public readonly $additionalRange = computed(() => Array(this.$additionCount()));
}
