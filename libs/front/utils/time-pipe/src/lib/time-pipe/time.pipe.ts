import { Pipe, PipeTransform } from '@angular/core';
import { TuiTime, TuiTimeMode } from '@taiga-ui/cdk';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  public transform(value: TuiTime, ...formats: TuiTimeMode[]): string {
    const format = formats[0] || 'HH:MM';
    return value.toString(format);
  }
}
