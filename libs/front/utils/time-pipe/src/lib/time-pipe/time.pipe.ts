import { Pipe, PipeTransform } from '@angular/core';
import { TuiTime, TuiTimeMode } from '@taiga-ui/cdk';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: TuiTime, ...args: TuiTimeMode[]): string {
    const format = args[0] || 'HH:MM';
    return value.toString(format);
  }
}
