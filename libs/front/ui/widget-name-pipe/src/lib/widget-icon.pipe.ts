import { Pipe, PipeTransform } from '@angular/core';
import { WIDGET_NAME_REGISTRY } from './widget-name.registry';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';

@Pipe({
  name: 'widgetIcon',
  standalone: true,
})
export class WidgetIconPipe implements PipeTransform {
  transform(widgetKey: WidgetType): string {
    return WIDGET_NAME_REGISTRY[widgetKey].icon || '';
  }
}
