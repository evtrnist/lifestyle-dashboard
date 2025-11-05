import { Pipe, PipeTransform } from '@angular/core';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { WIDGET_NAME_REGISTRY } from './widget-name.registry';

@Pipe({
  name: 'widgetIcon',
  standalone: true,
})
export class WidgetIconPipe implements PipeTransform {
  transform(widgetKey: WidgetType): string {
    return WIDGET_NAME_REGISTRY[widgetKey].icon || '';
  }
}
