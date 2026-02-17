import { InjectionToken, Signal } from '@angular/core';
import { SportActivitiesWidgetInput } from './sport-activities-widget-input';

export const SPORT_ACTIVITIES_WIDGET_TOKEN = new InjectionToken<Signal<SportActivitiesWidgetInput>>(
  'SPORT_ACTIVITIES_WIDGET_TOKEN',
);
