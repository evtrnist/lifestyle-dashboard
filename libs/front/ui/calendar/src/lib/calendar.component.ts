import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { DayComponent } from './day/day.component';
import { Config } from '@lifestyle-dashboard/config';
import { LifestyleWidgetDataService } from '@lifestyle-dashboard/lifestyle-widget-data-service';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { TuiDay } from '@taiga-ui/cdk';
import { catchError, EMPTY } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DayCardDialogContext } from '@lifestyle-dashboard/day-card-dialog';

@Component({
  selector: 'lifestyle-calendar',
  standalone: true,
  imports: [DatePipe, DayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  private readonly lifestyleWidgetDataService = inject(LifestyleWidgetDataService);
  public readonly $config = input.required<Config | null>({ alias: 'config' });

  public readonly $dayOpenRequest = output<DayCardDialogContext>({ alias: 'dayOpenRequest' });

  protected $currentDate = signal(new Date());
  protected $daysInMonth = signal<(Date | null)[]>([]);
  protected weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  private readonly $calendarData = signal<Record<string, any>>({});

  ngOnInit(): void {
    this.generateCalendar(this.$currentDate());
    this.updateDateInfo(this.$currentDate());
  }

  public generateCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const emptyCells = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const daysArray = Array(emptyCells)
      .fill(null)
      .concat([...Array(daysInCurrentMonth).keys()].map((i) => new Date(year, month, i + 1)));

    this.$daysInMonth.set(daysArray);
  }

  public nextMonth() {
    const newDate = new Date(this.$currentDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.$currentDate.set(newDate);
    this.generateCalendar(newDate);
    this.updateDateInfo(newDate);
  }

  public previousMonth() {
    const newDate = new Date(this.$currentDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.$currentDate.set(newDate);
    this.generateCalendar(newDate);

    this.updateDateInfo(newDate);
  }

  public getDayData(date: Date | null) {
    if (!date) {
      return null;
    }

    const dateKey = date.toLocaleDateString('sv-SE');
    const calendarData = this.$calendarData()['days']?.[dateKey] ?? null;

    return calendarData;
  }

  public openDayCard(date: Date | null) {
    if (!date) {
      return;
    }

    this.$dayOpenRequest.emit({date, calendarData: this.$calendarData()['days'] ?? {}});
  }

  private getCalendarData(startDate: TuiDay, endDate: TuiDay) {
    const config = this.$config();
    if (!config) {
      return;
    }

    const widgetTypes = Object.values(config.layout).filter(Boolean) as WidgetType[];

    this.lifestyleWidgetDataService
      .getData$(startDate, endDate, widgetTypes)
      .pipe(
        catchError((error) => {
          console.error('Error fetching calendar data:', error);

          return EMPTY;
        }),
      )
      .subscribe((data) => {
        console.log('Calendar data received:', data);
        this.$calendarData.set(data);
      });
  }

  private updateDateInfo(date: Date) {
    const [currentMonth, currentYear] = [new Date().getMonth(), new Date().getFullYear()];
    const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);

    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      this.getCalendarData(TuiDay.fromLocalNativeDate(start), TuiDay.currentLocal());
    } else {
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

      this.getCalendarData(TuiDay.fromLocalNativeDate(start), TuiDay.fromLocalNativeDate(end));
    }
  }
}
