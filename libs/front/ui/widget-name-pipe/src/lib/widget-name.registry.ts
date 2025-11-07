import { WidgetType } from '@lifestyle-dashboard/widget-contracts';

export const WIDGET_NAME_REGISTRY: Record<
  WidgetType,
  { name: string; icon: string }
> = {
  [WidgetType.TimeTracker]: { name: 'Time Tracker', icon: '@tui.chart-pie' },
  [WidgetType.WakeTime]: { name: 'Wake Time', icon: '@tui.clock' },
  [WidgetType.ToDos]: { name: 'Todos List', icon: '@tui.list-todo' },
};
