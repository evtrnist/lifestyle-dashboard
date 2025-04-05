import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToHours',
  standalone: true,
})
export class SecondsToHoursPipe implements PipeTransform {
  transform(value: number): string {
    // 29580 -> 8:13
    console.log(value)
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);

    console.log(`${hours}:${minutes}`)
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
}
