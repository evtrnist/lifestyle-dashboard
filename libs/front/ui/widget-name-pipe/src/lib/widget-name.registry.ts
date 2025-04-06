import { WidgetType } from '@lifestyle-dashboard/widget';

export const WIDGET_NAME_REGISTRY: Record<
  WidgetType,
  { name: string; icon: string }
> = {
  timetracker: { name: 'Time Tracker', icon: '@tui.chart-pie' },
};
