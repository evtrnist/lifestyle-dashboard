import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { LifeelButton } from '@lifestyle-dashboard/ui-kit';
import { HEADER_LINKS } from './header-links';

@Component({
  selector: 'lifestyle-dashboard-header',
  imports: [RouterLink, RouterLinkActive, TuiIcon, LifeelButton, TuiDataList, TuiDropdown],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly logoutRequested = output<void>();
  protected openedDropdown = false;

  protected readonly links = HEADER_LINKS;

  protected logout(): void {
    this.logoutRequested.emit();
    this.openedDropdown = false;
  }
}
