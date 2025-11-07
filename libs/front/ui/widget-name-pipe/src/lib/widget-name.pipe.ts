import { Pipe, PipeTransform } from '@angular/core';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { WIDGET_NAME_REGISTRY } from './widget-name.registry';

@Pipe({
  name: 'widgetName',
  standalone: true,
})
export class WidgetNamePipe implements PipeTransform {
  public transform(widgetKey: WidgetType): string {
    return WIDGET_NAME_REGISTRY[widgetKey].name || widgetKey;
  }
}
