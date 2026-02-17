import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHours',
  standalone: true,
})
export class SecondsToHoursPipe implements PipeTransform {
  public transform(value: number): string {
    // 29580 -> 8:13
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}
