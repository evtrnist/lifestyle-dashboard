import { ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal } from '@angular/core';
import { TimeTrackerWidgetInput } from '../timetracker-widget-input';
import { TIMETRACKER_WIDGET_TOKEN } from '../timetracker-widget.token';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { TimeSecondsControlComponent } from './time-seconds-control/time-seconds-control.component';

@Component({
  selector: 'lifestyle-timetracker-settings-widget',
  standalone: true,
  imports: [ReactiveFormsModule, TuiTextfield, TimeSecondsControlComponent],
  templateUrl: './timetracker-settings-widget.component.html',
  styleUrl: './timetracker-settings-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerSettingsWidgetComponent implements WidgetSettingsComponent, OnInit {
  public widgetData = inject<Signal<TimeTrackerWidgetInput>>(TIMETRACKER_WIDGET_TOKEN);

  public readonly $keys = computed(() => {
    const widgetData = this.widgetData();

    return Object.keys(widgetData.data) as Array<
    keyof TimeTrackerWidgetInput['data']
  >;
  })

  public form!: FormGroup;

  ngOnInit(): void {
    this.form = this.buildFormGroup(this.$keys());
  }

  public getControlInfo(key: keyof TimeTrackerWidgetInput['data']) {
    return {
      title: key,
      control: this.form.get(key) as unknown as FormControl<number | null>,
    };
  }

  private buildFormGroup(keys: Array<keyof TimeTrackerWidgetInput['data']>) {
    const formGroup = new FormGroup({});

    keys.forEach((key) => {
      const seconds = this.widgetData().data[key];
      formGroup.addControl(key, new FormControl<number | null>(seconds));
    });

    return formGroup;
  }
}
