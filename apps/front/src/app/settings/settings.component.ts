import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';
import { SETTING_URLS } from './setting-urls';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TuiTabs],
})
export class SettingsComponent {
  protected readonly SETTING_URLS = SETTING_URLS;
}
