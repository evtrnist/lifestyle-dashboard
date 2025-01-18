import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';

@Component({
  selector: 'lifestyle-calendar',
  standalone: true,
  imports: [CommonModule, DayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public readonly $widgets = input.required<any[]>({ alias: 'widgets' }); // Сигнал для виджетов
  public readonly pediodStatisticsGetRequest = output<{start: number, end: number}>();

  protected $currentDate = signal(new Date()); // Сигнал текущей даты
  protected $daysInMonth = signal<(Date | null)[]>([]); // Сигнал для дней текущего месяца
  protected weekDays: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ]; // Дни недели

  constructor() {
    // Инициализируем календарь при загрузке компонента
    this.generateCalendar(this.$currentDate());
    this.updateDateInfo(this.$currentDate());
    console.log('constructor', this.$currentDate());
  }

  // Генерация календаря для текущего месяца
  public generateCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // Определяем количество дней в текущем месяце
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  
    // Определяем первый день недели для месяца (0 = воскресенье)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
  
    // Пустые ячейки для начала недели
    const emptyCells = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
    // Создаём массив дат
    const daysArray = Array(emptyCells)
      .fill(null) // Пустые ячейки в начале
      .concat(
        // Дни текущего месяца
        [...Array(daysInCurrentMonth).keys()].map(
          (i) => new Date(year, month, i + 1) // Создаём объект Date для каждого дня
        )
      );

      console.log('daysArray', daysArray);
  
    // Устанавливаем массив в переменную
    this.$daysInMonth.set(daysArray);
  }
  

  // Перелистывание месяца вперед
  public nextMonth() {
    const newDate = new Date(this.$currentDate());
    newDate.setMonth(newDate.getMonth() + 1);
    this.$currentDate.set(newDate);
    this.generateCalendar(newDate);
    this.updateDateInfo(newDate);

  }

  // Перелистывание месяца назад
  public previousMonth() {
    const newDate = new Date(this.$currentDate());
    newDate.setMonth(newDate.getMonth() - 1);
    this.$currentDate.set(newDate);
    this.generateCalendar(newDate);
    
    this.updateDateInfo(newDate);
  }

  public chooseDay(date: Date|null) {
    if (!date) {
      return;
    }

    console.log(date);

    //const {startOfDay, endOfDay} = getDayRange(date);

   // this.pediodStatisticsGetRequest.emit({ start: startOfDay, end: endOfDay });
  }
    

  private updateDateInfo(date: Date) {
    console.log(date.getMonth(), 123)
    const [currentMonth, currentYear] = [new Date().getMonth(), new Date().getFullYear()];
    const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);

    console.log('start', start);
    console.log('currentMonth', currentMonth);
    console.log('currentYear', currentYear);

    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      console.log('===')
      this.pediodStatisticsGetRequest.emit({ start: start.getTime(), end: Date.now() });
    } else {
      console.log('!==')
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
      this.pediodStatisticsGetRequest.emit({ start: start.getTime()/1000, end: end.getTime()/1000 });
    }
  }
}