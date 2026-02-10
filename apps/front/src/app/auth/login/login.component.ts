import { AsyncPipe } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { TuiButton, TuiError, TuiHint, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonLoading, TuiFieldErrorPipe } from '@taiga-ui/kit';
import { State } from '@lifestyle-dashboard/state';
import { AuthDto } from '../auth.dto';

export const PASSWORD_MIN_LENGTH = 7;

enum LoginField {
  Email = 'email',
  Password = 'password',
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
      validators: [Validators.required, Validators.email],
    }),
    [LoginField.Password]: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(PASSWORD_MIN_LENGTH)],
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

  private wrongPasswordValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      const error = this.formError();

      if (error === HttpStatusCode.Unauthorized) {
        return {
          other: 'Invalid credentials',
        };
      }

      return null;
    };
  }
}
