import { InputJsonValue } from '@prisma/client/runtime/library';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';

export class UpsertDayDataDto {
  public widgetType: WidgetType;
  public date: string;
  public data: InputJsonValue;
}
