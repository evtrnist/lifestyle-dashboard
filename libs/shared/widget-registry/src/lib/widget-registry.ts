import {
  TIMETRACKER_WIDGET_TOKEN,
  TimetrackerSettingsWidgetComponent,
  TimetrackerWidgetComponent,
} from '@lifestyle-dashboard/timetracker-widget';
import {
  TODOS_WIDGET_TOKEN,
  TodosSettingsWidgetComponent,
  TodosWidgetComponent,
} from '@lifestyle-dashboard/todos-widget';
import {
  WAKETIME_WIDGET_TOKEN,
  WaketimeSettingsWidgetComponent,
  WaketimeWidgetComponent,
} from '@lifestyle-dashboard/waketime-widget';
import { WidgetOptions, WidgetType } from '@lifestyle-dashboard/widget-contracts';

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
  },
  [WidgetType.ToDos]: {
    component: TodosWidgetComponent,
    settingsComponent: TodosSettingsWidgetComponent,
    token: TODOS_WIDGET_TOKEN,
    label: 'Todos list',
    key: WidgetType.ToDos,
  },
};
