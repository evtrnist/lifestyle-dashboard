import { AsyncPipe } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiButton, TuiError, TuiHint, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonLoading, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { State } from '@lifestyle-dashboard/state';
import { AuthDto } from '../auth.dto';

const PASSWORD_MIN_LENGTH = 7;

enum LoginField {
  Email = 'email',
  Password = 'password',
}

// make global
export function requiredValidator(field: AbstractControl): Validators | null {
  return field.value
    ? null
    : {
        other: 'The field is required',
      };
}

export function passwordLengthValidator(field: AbstractControl): Validators | null {
  return field.value && field.value.length >= PASSWORD_MIN_LENGTH
    ? null
    : {
        other: 'The password must be at least 7 characters long',
      };
}

export function emailValidator(field: AbstractControl): Validators | null {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(field.value)
    ? null
    : {
        other: 'Invalid email format',
      };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public readonly state = input.required<State | null>();

  public readonly formError = input.required<HttpStatusCode | null>();

  public readonly userLoggedIn = output<AuthDto>();

  protected readonly shouldShowLoading = computed(() => this.state() === State.Loading);

  protected readonly LoginField = LoginField;

  protected readonly loginForm = new FormGroup({
    [LoginField.Email]: new FormControl('', {
      nonNullable: true,
      validators: [requiredValidator, emailValidator],
    }),
    [LoginField.Password]: new FormControl('', {
      nonNullable: true,
      validators: [requiredValidator, passwordLengthValidator],
    }),
  });

  public ngOnInit(): void {
    this.loginForm.get(LoginField.Password)?.setValidators(this.wrongPasswordValidator);
  }

  public login(): void {
    tuiMarkControlAsTouchedAndValidate(this.loginForm);

    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.userLoggedIn.emit({ email, password });
  }

  private wrongPasswordValidator = (control: AbstractControl): Validators | null => {
    const error = this.formError();

    if (error === HttpStatusCode.Unauthorized) {
      return {
        other: 'Invalid credentials',
      };
    }

    return null;
  };
}
