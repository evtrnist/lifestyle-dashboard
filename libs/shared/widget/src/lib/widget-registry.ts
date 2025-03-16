import { TimetrackerWidgetComponent, TIMETRACKER_WIDGET_TOKEN } from '@lifestyle-dashboard/timetracker-widget';
import { WidgetType } from './widget-type';
import { WidgetOptions } from './widget-options';

export const WidgetRegistry: Record<WidgetType, WidgetOptions> = {
  [WidgetType.TimeTracker]: {
    component: TimetrackerWidgetComponent,
    token: TIMETRACKER_WIDGET_TOKEN,
  },
};
