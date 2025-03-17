import { Slot, WidgetType } from '@lifestyle-dashboard/widget';

export interface Layout {
  [Slot.TopLeft]: WidgetType | null;
  [Slot.TopMiddle]: WidgetType | null;
  [Slot.TopRight]: WidgetType | null;
  [Slot.MiddleLeft]: WidgetType | null;
  [Slot.Middle]: WidgetType | null;
  [Slot.MiddleRight]: WidgetType | null;
  [Slot.BottomLeft]: WidgetType | null;
  [Slot.BottomMiddle]: WidgetType | null;
  [Slot.BottomRight]: WidgetType | null;
}
