import { InjectionToken, Type } from '@angular/core';
import { WidgetType } from './widget-type';

export interface WidgetOptions {
  component: Type<unknown>;
  settingsComponent: Type<unknown>;
  token: InjectionToken<unknown>;
  label: string;
  key: WidgetType;
}
