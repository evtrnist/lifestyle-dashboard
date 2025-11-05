import { InjectionToken, Type } from '@angular/core';
import { WidgetSettingsComponent } from './widget-settings-component';
import { WidgetType } from './widget-type';

export interface WidgetOptions {
  component: Type<unknown>;
  settingsComponent: Type<WidgetSettingsComponent>;
  token: InjectionToken<unknown>;
  label: string;
  key: WidgetType;
}
