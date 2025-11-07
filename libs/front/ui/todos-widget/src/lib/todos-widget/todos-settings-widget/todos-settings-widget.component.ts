import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, startWith } from 'rxjs';
import { TuiLabel } from '@taiga-ui/core/components/label';
import { TuiTextfield } from '@taiga-ui/core/components/textfield';
import { TuiInputNumber } from '@taiga-ui/kit';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { TodosWidgetInput } from '../todos-widget-input';
import { TODOS_WIDGET_TOKEN } from '../todos-widget.token';

enum ToDosField {
  AdditionCount = 'additionCount',
  CompletedCount = 'completedCount',
  PlannedCount = 'plannedCount',
  TotalCount = 'totalCount',
}

@Component({
  selector: 'lifestyle-dashboard-todos-settings-widget',
  templateUrl: './todos-settings-widget.component.html',
  styleUrl: './todos-settings-widget.component.less',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TuiInputNumber, TuiLabel, TuiTextfield],
})
export class TodosSettingsWidgetComponent
  implements WidgetSettingsComponent, OnInit
{
  private readonly destroyRef = inject(DestroyRef);
  public widgetData = inject<Signal<TodosWidgetInput>>(TODOS_WIDGET_TOKEN);

  public form!: FormGroup;

  public readonly ToDosField = ToDosField;

  public ngOnInit(): void {
    this.form = this.buildForm();

    this.setSubscriptionForUpdatingTotalCount();
  }

  private buildForm(): FormGroup {
    const data = this.widgetData()?.data;

    return new FormGroup({
      [ToDosField.AdditionCount]: new FormControl<number>(
        data ? data.additionCount : 0,
      ),
      [ToDosField.CompletedCount]: new FormControl<number>(
        data ? data.completedCount : 0,
      ),
      [ToDosField.PlannedCount]: new FormControl<number>(
        data ? data.plannedCount : 0,
      ),
      [ToDosField.TotalCount]: new FormControl<number>(
        data ? data.completedCount + data.additionCount : 0,
      ),
    });
  }

  private setSubscriptionForUpdatingTotalCount(): void {
    const additionCountControl = this.form.get(ToDosField.AdditionCount);
    const completedCountControl = this.form.get(ToDosField.CompletedCount);

    if (!additionCountControl || !completedCountControl) {
      return;
    }

    combineLatest([
      additionCountControl.valueChanges.pipe(
        startWith(additionCountControl.value),
      ),
      completedCountControl.valueChanges.pipe(
        startWith(completedCountControl.value),
      ),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([additionCount, completedCount]) => {
        const totalCount = (additionCount ?? 0) + (completedCount ?? 0);
        const totalCountControl = this.form.get(ToDosField.TotalCount);

        if (totalCountControl) {
          totalCountControl.setValue(totalCount);
        }
      });
  }
}
