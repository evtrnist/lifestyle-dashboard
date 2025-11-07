import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { INITIAL_TIME_TRACKER_WIDGET_INPUT } from '../initial-time-tracker-widget-input';
import { TimeTrackerWidgetInput } from '../timetracker-widget-input';
import { TIMETRACKER_WIDGET_TOKEN } from '../timetracker-widget.token';
import { TimeSecondsControlComponent } from './time-seconds-control/time-seconds-control.component';

@Component({
  selector: 'lifestyle-timetracker-settings-widget',
  standalone: true,
  imports: [ReactiveFormsModule, TuiTextfield, TimeSecondsControlComponent],
  templateUrl: './timetracker-settings-widget.component.html',
  styleUrl: './timetracker-settings-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerSettingsWidgetComponent
  implements WidgetSettingsComponent, OnInit
{
  public widgetData = inject<Signal<TimeTrackerWidgetInput>>(
    TIMETRACKER_WIDGET_TOKEN,
  );

  public readonly $keys = computed(() => {
    const widgetData = this.widgetData();

    return widgetData?.data
      ? (Object.keys(widgetData?.data) as Array<
          keyof TimeTrackerWidgetInput['data']
        >)
      : (Object.keys(INITIAL_TIME_TRACKER_WIDGET_INPUT) as Array<
          keyof TimeTrackerWidgetInput['data']
        >);
  });

  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = this.buildFormGroup(this.$keys());
  }

  public getControlInfo(key: keyof TimeTrackerWidgetInput['data']): {
    title: string;
    control: FormControl<number | null>;
  } {
    return {
      title: key,
      control: this.form.get(key) as unknown as FormControl<number | null>,
    };
  }

  private buildFormGroup(
    keys: Array<keyof TimeTrackerWidgetInput['data']>,
  ): FormGroup {
    const formGroup = new FormGroup({});
    const widgetData = this.widgetData().data;

    console.log('widgetData in buildFormGroup', widgetData);

    keys.forEach((key) => {
      console.log(
        'building control for key',
        key,
        widgetData,
        INITIAL_TIME_TRACKER_WIDGET_INPUT[key],
      );
      const seconds = widgetData
        ? widgetData?.[key]
        : INITIAL_TIME_TRACKER_WIDGET_INPUT[key];

      formGroup.addControl(key, new FormControl<number | null>(seconds));
    });

    return formGroup;
  }
}
