import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';

@Component({
  selector: 'lifestyle-dashboard-sport-activities-widget',
  imports: [],
  templateUrl: './sport-activities-settings-widget.component.html',
  styleUrl: './sport-activities-settings-widget.component.less',
})
export class SportActivitiesSettingsWidgetComponent implements WidgetSettingsComponent {
  form = new FormGroup({});
}
