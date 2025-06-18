import { Slot } from '@lifestyle-dashboard/widget';

export interface WidgetLayoutSlot {
  title: string;
  description: string;
  value: string;
}

export const WIDGET_LAYOUT_SLOT_MAP = {
  [Slot.TopLeft]: {
    title: 'Top Left',
    description: 'Top left corner of the calendar day',
    value: '',
  },
  [Slot.TopMiddle]: {
    title: 'Top Middle',
    description: 'Top middle section of the calendar day',
    value: '',
  },
  [Slot.TopRight]: {
    title: 'Top Right',
    description: 'Top right corner of the calendar day',
    value: '',
  },
  [Slot.MiddleLeft]: {
    title: 'Middle Left',
    description: 'Middle left section of the calendar day',
    value: '',
  },
  [Slot.Middle]: {
    title: 'Middle',
    description: 'Middle section of the calendar day',
    value: '',
  },
  [Slot.MiddleRight]: {
    title: 'Middle Right',
    description: 'Middle right section of the calendar day',
    value: '',
  },
  [Slot.BottomLeft]: {
    title: 'Bottom Left',
    description: 'Bottom left corner of the calendar day',
    value: '',
  },
  [Slot.BottomMiddle]: {
    title: 'Bottom Middle',
    description: 'Bottom middle section of the calendar day',
    value: '',
  },
  [Slot.BottomRight]: {
    title: 'Bottom Right',
    description: 'Bottom right corner of the calendar day',
    value: '',
  },
};
