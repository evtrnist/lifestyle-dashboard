import { Component } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';

@Component({
  selector: 'lifestyle-dashboard-sport-activities-widget',
  imports: [ReactiveFormsModule, TuiButton, TuiIcon, TuiTextfield],
  templateUrl: './sport-activities-settings-widget.component.html',
  styleUrls: ['./sport-activities-settings-widget.component.less'],
})
export class SportActivitiesSettingsWidgetComponent implements WidgetSettingsComponent {
  public readonly form = new FormArray([new FormControl('')]);

  public addActivity(): void {
    this.form.push(new FormControl(''));
  }

  public removeActivity(index: number): void {
    this.form.removeAt(index);
  }
}
