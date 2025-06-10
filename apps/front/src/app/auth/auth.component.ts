import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTabs } from '@taiga-ui/kit';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { SignUpComponent } from './sign-up/sign-up.component';

enum AuthState {
  Login = 'login',
  SignUp = 'signup',
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TuiTabs, LoginComponent, SignUpComponent],
  providers: [AuthService],
})
export class AuthComponent {
  private readonly authService = inject(AuthService);

  protected readonly AuthState = AuthState;

  protected activeItemIndex = signal(0);

  protected readonly $formMode = signal<AuthState>(AuthState.Login);

  protected readonly state = this.authService.authState;

  protected openForm(state: AuthState) {
    this.$formMode.set(state);
    this.activeItemIndex.set(state === AuthState.Login ? 0 : 1);
  }

  protected login(dto: AuthDto) {
    this.authService.login(dto);
  }

  protected signUp(dto: AuthDto) {
    this.authService.signUp(dto);
}

}
