import { Pipe, PipeTransform } from '@angular/core';
import { WIDGET_NAME_REGISTRY } from './widget-name.registry';
import { WidgetType } from '@lifestyle-dashboard/widget';

@Pipe({
  name: 'widgetName',
  standalone: true,
})
export class WidgetNamePipe implements PipeTransform {
  transform(widgetKey: WidgetType): string {
    return WIDGET_NAME_REGISTRY[widgetKey].name || widgetKey;
  }
}
