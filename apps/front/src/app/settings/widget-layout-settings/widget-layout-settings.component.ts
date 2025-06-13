import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-widget-layout-settings',
  templateUrl: './widget-layout-settings.component.html',
  styleUrls: ['./widget-layout-settings.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetLayoutSettingsComponent {}
