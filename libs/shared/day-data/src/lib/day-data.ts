import { WidgetType } from '@lifestyle-dashboard/widget-contracts';

export interface CreateOrUpdateDayDataDto {
  widgetType: WidgetType;
  date: string;
  widgetData: unknown;
}