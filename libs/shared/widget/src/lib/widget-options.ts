import { InjectionToken, Type } from '@angular/core';

export interface WidgetOptions {
  component: Type<unknown>;
  token: InjectionToken<unknown>;
}
