import {
  TimetrackerWidgetComponent,
  TIMETRACKER_WIDGET_TOKEN,
  TimetrackerSettingsWidgetComponent,
} from '@lifestyle-dashboard/timetracker-widget';
import { WidgetOptions, WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { WAKETIME_WIDGET_TOKEN, WaketimeSettingsWidgetComponent, WaketimeWidgetComponent } from '@lifestyle-dashboard/waketime-widget';

export const WidgetRegistry: Record<WidgetType, WidgetOptions> = {
  [WidgetType.TimeTracker]: {
    component: TimetrackerWidgetComponent,
    settingsComponent: TimetrackerSettingsWidgetComponent,
    token: TIMETRACKER_WIDGET_TOKEN,
    label: 'Time Tracker',
    key: WidgetType.TimeTracker,
  },
  [WidgetType.WakeTime]: {
    component: WaketimeWidgetComponent,
    settingsComponent: WaketimeSettingsWidgetComponent,
    token: WAKETIME_WIDGET_TOKEN,
    label: 'Wake Time',
    key: WidgetType.WakeTime,
  }
};
