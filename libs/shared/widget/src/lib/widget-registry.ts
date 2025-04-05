import {
  TimetrackerWidgetComponent,
  TIMETRACKER_WIDGET_TOKEN,
  TimetrackerSettingsWidgetComponent,
} from '@lifestyle-dashboard/timetracker-widget';
import { WidgetType } from './widget-type';
import { WidgetOptions } from './widget-options';

export const WidgetRegistry: Record<WidgetType, WidgetOptions> = {
  [WidgetType.TimeTracker]: {
    component: TimetrackerWidgetComponent,
    settingsComponent: TimetrackerSettingsWidgetComponent,
    token: TIMETRACKER_WIDGET_TOKEN,
  },
};
