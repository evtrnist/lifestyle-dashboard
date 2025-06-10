import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { State } from '../state';
import { AuthDto } from '../auth.dto';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import {
  emailValidator,
  passwordLengthValidator,
  requiredValidator,
} from '../login/login.component';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { AsyncPipe } from '@angular/common';
import { TuiButton, TuiError, TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { TuiButtonLoading, TuiFieldErrorPipe } from '@taiga-ui/kit';

function passwordMatchValidator(
  group: AbstractControl,
): ValidationErrors | null {
  const password = group.get(SignUpField.Password)?.value;
  const repeat = group.get(SignUpField.RepeatPassword)?.value;

  return password === repeat ? null : { passwordMismatch: true };
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
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipe,
    TuiError,
    TuiButton,
    TuiButtonLoading,
  ],
})
export class SignUpComponent {
  public readonly state = input.required<State | null>();

  public readonly userSignedUp = output<AuthDto>();

  protected readonly shouldShowLoading = computed(
    () => this.state() === State.Loading,
  );

  protected readonly SignUpField = SignUpField;

  protected readonly signUpForm = new FormGroup(
    {
      [SignUpField.Email]: new FormControl('', {
        nonNullable: true,
        validators: [requiredValidator, emailValidator],
      }),
      [SignUpField.Password]: new FormControl('', {
        nonNullable: true,
        validators: [requiredValidator, passwordLengthValidator],
      }),
      [SignUpField.RepeatPassword]: new FormControl('', {
        nonNullable: true,
        validators: [requiredValidator],
      }),
    },
    { validators: [passwordMatchValidator] },
  );

  public signUp(): void {
    tuiMarkControlAsTouchedAndValidate(this.signUpForm);

    const { email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !email || !password) {
      return;
    }

    this.userSignedUp.emit({ email, password });
  }
}
