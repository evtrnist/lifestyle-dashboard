import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { HEADER_LINKS } from './header-links';

@Component({
  selector: 'lifestyle-dashboard-header',
  imports: [RouterLink, TuiIcon, TuiButton, TuiDataList, TuiDropdown],
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
