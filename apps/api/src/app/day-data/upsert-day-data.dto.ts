import { InputJsonValue } from '@prisma/client/runtime/library';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';

export class UpsertDayDataDto {
  widgetType: WidgetType;
  date: string;
  data: InputJsonValue;
}
