import { Inject, InjectionToken, Signal } from '@angular/core';
import { WaketimeWidgetInput } from './waketime-widget-input';

export const WAKETIME_WIDGET_TOKEN = new InjectionToken<Signal<WaketimeWidgetInput>>(
  'WAKETIME_WIDGET_TOKEN',
);
