import { Slot, WidgetType } from '@lifestyle-dashboard/widget-contracts';

export interface WidgetLayoutSlot {
  title: string;
  description: string;
  value: null | WidgetType;
  label: string;
}

export const WIDGET_LAYOUT_SLOT_MAP: Record<Slot, WidgetLayoutSlot> = {
  [Slot.TopLeft]: {
    title: 'Top Left',
    description: 'Top left corner of the calendar day',
    value: null,
    label: '',
  },
  [Slot.TopMiddle]: {
    title: 'Top Middle',
    description: 'Top middle section of the calendar day',
    value: null,
    label: '',
  },
  [Slot.TopRight]: {
    title: 'Top Right',
    description: 'Top right corner of the calendar day',
    value: null,
    label: '',
  },
  [Slot.MiddleLeft]: {
    title: 'Middle Left',
    description: 'Middle left section of the calendar day',
    value: null,
    label: '',
  },
  [Slot.Middle]: {
    title: 'Middle',
    description: 'Middle section of the calendar day',
    value: null,
    label: '',
  },
  [Slot.MiddleRight]: {
    title: 'Middle Right',
    description: 'Middle right section of the calendar day',
    value: null,
    label: '',
  },
  [Slot.BottomLeft]: {
    title: 'Bottom Left',
    description: 'Bottom left corner of the calendar day',
    value: null,
    label: '',
  },
  [Slot.BottomMiddle]: {
    title: 'Bottom Middle',
    description: 'Bottom middle section of the calendar day',
    value: null,
    label: '',
  },
  [Slot.BottomRight]: {
    title: 'Bottom Right',
    description: 'Bottom right corner of the calendar day',
    value: null,
    label: '',
  },
};
