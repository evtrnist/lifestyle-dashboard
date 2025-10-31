import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputTime } from '@taiga-ui/kit';
import { TuiTime } from '@taiga-ui/cdk';
import { WaketimeWidgetInput } from '../waketime-widget-input';
import { WAKETIME_WIDGET_TOKEN } from '../waketime-widget.token';

enum WaketimeField {
  WakeTime = 'wakeTime',
}

@Component({
  selector: 'lib-waketime-settings-widget',
  templateUrl: './waketime-settings-widget.component.html',
  styleUrl: './waketime-settings-widget.component.less',
  imports: [ReactiveFormsModule, TuiTextfield, TuiInputTime],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class WaketimeSettingsWidgetComponent implements WidgetSettingsComponent, OnInit {
  public widgetData = inject<Signal<WaketimeWidgetInput>>(WAKETIME_WIDGET_TOKEN);

  public form!: FormGroup;

  public readonly WaketimeField = WaketimeField;

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm() {
    const waketime = this.widgetData()?.data?.waketime;

    const time = waketime ? new TuiTime(waketime['hours'], waketime['minutes']) : new TuiTime(0, 0);

    return new FormGroup({
      [WaketimeField.WakeTime]: new FormControl<TuiTime>(time),
    });
  }
}
