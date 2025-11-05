import { InjectionToken, Signal } from '@angular/core';
import { TodosWidgetInput } from './todos-widget-input';

export const TODOS_WIDGET_TOKEN = new InjectionToken<Signal<TodosWidgetInput>>(
  'TODOS_WIDGET_TOKEN',
);
