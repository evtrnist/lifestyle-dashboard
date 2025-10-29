import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';

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
  imports: [TuiRingChart, SecondsToHoursPipe],
  standalone: true,
  templateUrl: './timetracker-widget.component.html',
  styleUrl: './timetracker-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerWidgetComponent {
  public widgetData = inject<Signal<TimeTrackerWidgetInput>>(TIMETRACKER_WIDGET_TOKEN);

  public readonly $size = computed(() => this.widgetData().size);

  public readonly $routine = computed(() => this.widgetData().data.routine);
  public readonly $health = computed(() => this.widgetData().data.health);
  public readonly $selfDevelopment = computed(() => this.widgetData().data.selfDevelopment);
  public readonly $leisure = computed(() => this.widgetData().data.leisure);

  public readonly $value = signal([20, 40, 25, 15]);
  public readonly $chartValue = signal(this.getChartValue());

  public readonly $shouldBeVisible = computed(() => {
    const size = this.$size();
    const index = this.$index();

    return size !== 's' && Boolean(index);
  });

  protected readonly $index = signal(NaN);
  protected readonly total = tuiSum(...this.$value());

  protected readonly labels = [
    TimetrackerCategory.Routine,
    TimetrackerCategory.SelfDevelopment,

    TimetrackerCategory.Health,
    TimetrackerCategory.Leisure,
  ];

  protected get label(): string {
    return (
      (Number.isNaN(this.$index()) ? null : this.labels[this.$index()]) ?? ''
    );
  }

  protected getSeconds(): number {
    return (
      (Number.isNaN(this.$index())
        ? null
        : [this.$routine(), this.$health(), this.$selfDevelopment(), this.$leisure()][
            this.$index()
          ]) ?? 0
    );
  }

  private getChartValue(): number[] {
    // перевести все значения в проценты
    // отсортировать по CATEGORY_ORDER

    const leisure = (this.$leisure() / SEC_IN_DAY) * 100;
    const routine = (this.$routine() / SEC_IN_DAY) * 100;
    const health = (this.$health() / SEC_IN_DAY) * 100;
    const selfDevelopment = (this.$selfDevelopment() / SEC_IN_DAY) * 100;

    return [routine, health, selfDevelopment, leisure];
  }
}
