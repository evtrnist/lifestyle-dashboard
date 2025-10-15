import { InjectionToken, Type } from '@angular/core';
import { WidgetType } from './widget-type';
import { WidgetSettingsComponent } from './widget-settings-component';

export interface WidgetOptions {
  component: Type<unknown>;
  settingsComponent: Type<WidgetSettingsComponent>;
  token: InjectionToken<unknown>;
  label: string;
  key: WidgetType;
}
