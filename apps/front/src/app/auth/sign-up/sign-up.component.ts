import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiError,
  TuiHint,
  TuiLabel,
  TuiNotification,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiButtonLoading, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { State } from '@lifestyle-dashboard/state';
import { AuthDto } from '../auth.dto';
import { PASSWORD_MIN_LENGTH } from '../login/login.component';

function repeatPasswordValidatorFactory(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = form.get(SignUpField.Password)?.value;
    const repeat = control.value;

    return password === repeat ? null : { passwordMismatch: 'Passwords do not match' };
  };
}

enum SignUpField {
  Email = 'email',
  Password = 'password',
  RepeatPassword = 'repeatPassword',
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiHint,
    TuiTextfield,
    TuiFieldErrorPipe,
    TuiError,
    TuiButton,
    TuiButtonLoading,
    TuiLabel,
    TuiNotification,
  ],
})
export class SignUpComponent implements OnInit {
  public readonly state = input.required<State | null>();

  public readonly userSignedUp = output<AuthDto>();

  protected readonly $shouldShowLoading = computed(() => this.state() === State.Loading);

  protected readonly $shouldShowConflictError = computed(() => this.state() === State.Conflict);

  protected readonly SignUpField = SignUpField;

  protected readonly signUpForm = new FormGroup({
    [SignUpField.Email]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    [SignUpField.Password]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
    }),
    [SignUpField.RepeatPassword]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public ngOnInit(): void {
    this.signUpForm
      .get(SignUpField.RepeatPassword)
      ?.addValidators(repeatPasswordValidatorFactory(this.signUpForm));
  }

  public signUp(): void {
    tuiMarkControlAsTouchedAndValidate(this.signUpForm);

    const { email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !email || !password) {
      return;
    }

    this.userSignedUp.emit({ email, password });
  }
}
