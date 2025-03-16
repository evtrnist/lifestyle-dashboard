import { Slot, Widget } from '@lifestyle-dashboard/widget';

export interface Layout {
  [Slot.TopLeft]: Widget | null;
  [Slot.TopMiddle]: Widget | null;
  [Slot.TopRight]: Widget | null;
  [Slot.MiddleLeft]: Widget | null;
  [Slot.Middle]: Widget | null;
  [Slot.MiddleRight]: Widget | null;
  [Slot.BottomLeft]: Widget | null;
  [Slot.BottomMiddle]: Widget | null;
  [Slot.BottomRight]: Widget | null;
}
