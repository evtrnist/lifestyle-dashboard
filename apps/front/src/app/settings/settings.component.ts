import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiTabs],
})
export class SettingsComponent {}
