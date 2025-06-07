import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTabs } from '@taiga-ui/kit';

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
  imports: [ReactiveFormsModule, TuiTabs],
})
export class AuthComponent {
  protected readonly AuthState = AuthState;

  protected activeItemIndex = signal(0);

  protected readonly $formMode = signal<AuthState>(AuthState.Login);

  protected openForm(state: AuthState) {
    this.$formMode.set(state);
    this.activeItemIndex.set(state === AuthState.Login ? 0 : 1);
  }
}
