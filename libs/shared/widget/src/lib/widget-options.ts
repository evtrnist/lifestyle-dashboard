import { InjectionToken, Type } from '@angular/core';

export interface WidgetOptions {
  component: Type<unknown>;
  settingsComponent: Type<unknown>;
  token: InjectionToken<unknown>;
}
