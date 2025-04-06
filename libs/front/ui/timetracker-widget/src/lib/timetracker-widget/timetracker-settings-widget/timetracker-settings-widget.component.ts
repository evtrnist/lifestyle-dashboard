import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTrackerWidgetInput } from '../timetracker-widget-input';
import { TIMETRACKER_WIDGET_TOKEN } from '../timetracker-widget.token';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTime } from '@taiga-ui/cdk';
import {
  TuiInputTimeModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
} from '@taiga-ui/legacy';

@Component({
  selector: 'lifestyle-timetracker-settings-widget',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputTimeModule,
    TuiTextfieldControllerModule,
    TuiUnfinishedValidator,
  ],
  standalone: true,
  templateUrl: './timetracker-settings-widget.component.html',
  styleUrl: './timetracker-settings-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerSettingsWidgetComponent {
  public widgetData = inject<TimeTrackerWidgetInput>(TIMETRACKER_WIDGET_TOKEN);

  public readonly keys = Object.keys(this.widgetData.timeData) as Array<
    keyof TimeTrackerWidgetInput['timeData']
  >;

  public readonly formGroup = this.buildFormGroup(this.keys);

  public getControlInfo(key: keyof TimeTrackerWidgetInput['timeData']) {
    return {
      title: key,
      control: this.formGroup.get(key) as unknown as FormControl,
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
