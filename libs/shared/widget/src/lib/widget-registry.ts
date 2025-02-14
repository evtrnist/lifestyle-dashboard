import { Type } from '@angular/core';
import { TimetrackerWidgetComponent } from '@lifestyle-dashboard/timetracker-widget';
import { WidgetType } from './widget-type';

export const WidgetRegistry: Record<WidgetType, Type<unknown>> = {
  [WidgetType.TimeTracker]: TimetrackerWidgetComponent,
};
