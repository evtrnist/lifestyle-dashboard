import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiRingChart } from '@taiga-ui/addon-charts';
import { TimetrackerCategory } from '@lifestyle-dashboard/timetracker';
import { SecondsToHoursPipe } from './seconds-to-hours.pipe';
import { tuiSum } from '@taiga-ui/cdk';
import { TIMETRACKER_WIDGET_TOKEN } from './timetracker-widget.token';
import { TimeTrackerWidgetInput } from './timetracker-widget-input';

const CATEGORY_ORDER: Record<TimetrackerCategory, number> = {
  [TimetrackerCategory.Routine]: 0,
  [TimetrackerCategory.Health]: 1,
  [TimetrackerCategory.SelfDevelopment]: 2,
  [TimetrackerCategory.Leisure]: 3,
};

const SEC_IN_DAY = 86400;
@Component({
  selector: 'lifestyle-timetracker-widget',
  imports: [CommonModule, TuiRingChart, SecondsToHoursPipe],
  standalone: true,
  templateUrl: './timetracker-widget.component.html',
  styleUrl: './timetracker-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerWidgetComponent {
  public widgetData = inject<TimeTrackerWidgetInput>(TIMETRACKER_WIDGET_TOKEN);
 public readonly $size = input<TuiRingChart['size']>('s', {
    alias: 'size',
  });

  public readonly leisure = this.widgetData.leisure;
  public readonly routine = this.widgetData.routine;
  public readonly health = this.widgetData.health;
  public readonly selfDevelopment = this.widgetData.selfDevelopment

  public readonly $value = signal([20, 40, 25, 15]);
  public readonly $chartValue = computed(() => {
    // перевести все значения в проценты
    // отсортировать по CATEGORY_ORDER

    const leisure = (this.leisure / SEC_IN_DAY) * 100;
    const routine = (this.routine / SEC_IN_DAY) * 100;
    const health = (this.health / SEC_IN_DAY) * 100;
    const selfDevelopment = (this.selfDevelopment / SEC_IN_DAY) * 100;

    return [routine, health, selfDevelopment, leisure];
  });

  public readonly $shouldBeVisible = computed(() => {
    const size = this.$size();
    return size !== 's';
  });

  protected index = NaN;
  protected readonly total = tuiSum(...this.$value());

  protected readonly labels = [
    TimetrackerCategory.Routine,
    TimetrackerCategory.Health,
    TimetrackerCategory.SelfDevelopment,
    TimetrackerCategory.Leisure,
  ];

  protected get seconds(): number {
    return (
      (Number.isNaN(this.index)
        ? null
        : [
            this.routine,
            this.health,
            this.selfDevelopment,
            this.leisure,
          ][this.index]) ?? 0
    );
  }

  protected get label(): string {
    return (Number.isNaN(this.index) ? null : this.labels[this.index]) ?? '';
  }
}
