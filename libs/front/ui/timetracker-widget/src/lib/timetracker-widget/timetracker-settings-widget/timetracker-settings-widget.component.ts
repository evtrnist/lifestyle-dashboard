import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TimeTrackerWidgetInput } from '../timetracker-widget-input';
import { TIMETRACKER_WIDGET_TOKEN } from '../timetracker-widget.token';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiInputTime } from '@taiga-ui/kit';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { TuiTime } from '@taiga-ui/cdk';

@Component({
  selector: 'lifestyle-timetracker-settings-widget',
  imports: [ReactiveFormsModule, TuiTextfield, TuiInputTime, TuiLabel],
  standalone: true,
  templateUrl: './timetracker-settings-widget.component.html',
  styleUrl: './timetracker-settings-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerSettingsWidgetComponent
  implements WidgetSettingsComponent
{
  public widgetData = inject<TimeTrackerWidgetInput>(TIMETRACKER_WIDGET_TOKEN);

  public readonly keys = Object.keys(this.widgetData.timeData) as Array<
    keyof TimeTrackerWidgetInput['timeData']
  >;

  public readonly form = this.buildFormGroup(this.keys);

  public getControlInfo(key: keyof TimeTrackerWidgetInput['timeData']) {
    return {
      title: key,
      control: this.form.get(key) as unknown as FormControl,
    };
  }

  private buildFormGroup(
    keys: Array<keyof TimeTrackerWidgetInput['timeData']>,
  ) {
    console.log('build');
    const formGroup = new FormGroup({});

    keys.forEach((key) => {
      const seconds = this.widgetData.timeData[key];

      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      formGroup.addControl(key, new FormControl(new TuiTime(hours, minutes)));
    });

    return formGroup;
  }
}
