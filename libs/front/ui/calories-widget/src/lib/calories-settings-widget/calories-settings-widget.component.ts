import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';

type CaloriesField = 'eaten' | 'burned';

type CaloriesSettingsForm = Record<CaloriesField, FormControl<number | null>>;

@Component({
  selector: 'lifestyle-dashboard-calories-settings-widget',
  templateUrl: './calories-settings-widget.component.html',
  styleUrls: ['./calories-settings-widget.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TuiInputNumber, TuiTextfield, TuiLabel],
})
export class CaloriesSettingsWidgetComponent implements WidgetSettingsComponent {
  public readonly form = new FormGroup<CaloriesSettingsForm>({
    eaten: new FormControl(0),
    burned: new FormControl(0),
  });
}
