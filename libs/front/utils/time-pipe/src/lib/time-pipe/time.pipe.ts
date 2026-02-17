import { MaskitoTimeMode } from '@maskito/kit';
import { Pipe, PipeTransform } from '@angular/core';
import { TuiTime } from '@taiga-ui/cdk';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  public transform({ hours, minutes }: TuiTime, ...formats: MaskitoTimeMode[]): string {
    const format = formats[0] || 'HH:MM';

    return new TuiTime(hours, minutes).toString(format);
  }
}
