import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TuiTabs } from '@taiga-ui/kit';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';
import { SETTING_URLS } from './setting-urls';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TuiTabs],
})
export class SettingsComponent implements OnInit {
  private readonly lifestyleConfigService = inject(
    LifestyleWidgetConfigService,
  );

  protected readonly SETTING_URLS = SETTING_URLS;

  private readonly $config = this.lifestyleConfigService.$config;

  public ngOnInit(): void {
    if (!this.$config()) {
      this.lifestyleConfigService.init();
    }
  }
}
