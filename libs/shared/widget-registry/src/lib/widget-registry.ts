import {
  TimetrackerWidgetComponent,
  TIMETRACKER_WIDGET_TOKEN,
  TimetrackerSettingsWidgetComponent,
} from '@lifestyle-dashboard/timetracker-widget';
import { WidgetOptions, WidgetType } from '@lifestyle-dashboard/widget-contracts';


export const WidgetRegistry: Record<WidgetType, WidgetOptions> = {
  [WidgetType.TimeTracker]: {
    component: TimetrackerWidgetComponent,
    settingsComponent: TimetrackerSettingsWidgetComponent,
    token: TIMETRACKER_WIDGET_TOKEN,
    label: 'Time Tracker',
    key: WidgetType.TimeTracker,
  },
};
