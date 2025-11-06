import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TuiTime } from '@taiga-ui/cdk';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputTime } from '@taiga-ui/kit';

@Component({
  selector: 'time-seconds-control',
  standalone: true,
  imports: [ReactiveFormsModule, TuiTextfield, TuiInputTime],
  template: `
    <tui-textfield>
      <label [for]="$id()" tuiLabel>{{ $label() }}</label>
      <input [id]="$id()" tuiInputTime [formControl]="ui" (blur)="onTouched()" />
    </tui-textfield>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeSecondsControlComponent),
      multi: true,
    },
  ],
})
export class TimeSecondsControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  public readonly $label = input.required<string>({ alias: 'label' });
  public readonly $id = input<string>(`time-${Math.random().toString(36).slice(2)}`, {
    alias: 'id',
  });

  public ui = new FormControl<TuiTime | null>(null);
  private sub?: Subscription;

  private onChange: (value: number | null) => void = () => {};
  public onTouched: () => void = () => {};

  ngOnInit(): void {
    this.sub = this.ui.valueChanges.subscribe((v) => {
      this.onChange(v ? v.hours * 3600 + v.minutes * 60 : null);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // CVA
  writeValue(value: number | null): void {
    if (value == null) {
      this.ui.setValue(null, { emitEvent: false });
      return;
    }
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    this.ui.setValue(new TuiTime(h, m), { emitEvent: false });
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.ui.disable({ emitEvent: false });
    } else {
      this.ui.enable({ emitEvent: false });
    }
  }
}
