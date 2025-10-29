import { WidgetType } from "@lifestyle-dashboard/widget-contracts";
import { InputJsonValue } from "@prisma/client/runtime/library";

export class UpsertDayDataDto {
  widgetType: WidgetType;
  date: string;                           
  data: InputJsonValue
}