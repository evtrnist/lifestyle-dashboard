import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiInputNumber } from '@taiga-ui/kit';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { CaloriesWidgetInput } from '../calories-widget-input';
import { CALORIES_WIDGET_TOKEN } from '../calories-widget.token';

type CaloriesField = 'eaten' | 'burned';

type CaloriesSettingsForm = Record<CaloriesField, FormControl<number | null>>;

@Component({
  selector: 'lifestyle-dashboard-calories-settings-widget',
  templateUrl: './calories-settings-widget.component.html',
  styleUrls: ['./calories-settings-widget.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TuiInputNumber, TuiTextfield, TuiLabel],
})
export class CaloriesSettingsWidgetComponent implements WidgetSettingsComponent, OnInit {
  public readonly form = new FormGroup<CaloriesSettingsForm>({
    eaten: new FormControl(0),
    burned: new FormControl(0),
  });

  public readonly widgetData = inject<Signal<CaloriesWidgetInput>>(CALORIES_WIDGET_TOKEN);

  public readonly $size = computed(() => this.widgetData()?.size);

  public readonly $caloriesData = computed(() => this.widgetData()?.data);

  public ngOnInit(): void {
    this.setWidgetData();
  }

  private setWidgetData(): void {
    const caloriesData = this.$caloriesData();

    if (!caloriesData) {
      return;
    }
    this.form.setValue({
      eaten: caloriesData.eaten,
      burned: caloriesData.burned,
    });
  }
}
