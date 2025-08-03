import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
} from '@angular/core';
import { AuthDto } from '../auth.dto';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
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
import { State } from '@lifestyle-dashboard/state';

function repeatPasswordValidatorFactory(form: FormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = form.get(SignUpField.Password)?.value;
    const repeat = control.value;

    return password === repeat
      ? null
      : { passwordMismatch: 'Passwords do not match' };
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
    TuiInputModule,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiFieldErrorPipe,
    TuiError,
    TuiButton,
    TuiButtonLoading,
  ],
})
export class SignUpComponent implements OnInit {
  public readonly state = input.required<State | null>();

  public readonly userSignedUp = output<AuthDto>();

  protected readonly shouldShowLoading = computed(
    () => this.state() === State.Loading,
  );

  protected readonly SignUpField = SignUpField;

  protected readonly signUpForm = new FormGroup({
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
  });

  ngOnInit(): void {
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
