import { InjectionToken, Signal } from '@angular/core';
import { TimeTrackerWidgetInput } from './timetracker-widget-input';

export const TIMETRACKER_WIDGET_TOKEN = new InjectionToken<Signal<TimeTrackerWidgetInput>>(
  'TIMETRACKER_WIDGET_TOKEN',
);
