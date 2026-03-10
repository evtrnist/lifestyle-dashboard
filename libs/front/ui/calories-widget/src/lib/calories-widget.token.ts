import { InjectionToken, Signal } from '@angular/core';
import { CaloriesWidgetInput } from './calories-widget-input';

export const CALORIES_WIDGET_TOKEN = new InjectionToken<Signal<CaloriesWidgetInput>>(
  'CALORIES_WIDGET_TOKEN',
);
