import { Slot } from './slot';
import { WidgetType } from './widget-type';

export interface Widget {
  slot: Slot;
  widgetType: WidgetType;
}
