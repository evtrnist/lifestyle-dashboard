import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { CalendarComponent } from '@lifestyle-dashboard/calendar';
import { tuiDialog } from '@taiga-ui/core';
import { DayCardDialogComponent } from '@lifestyle-dashboard/day-card-dialog';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CalendarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  public readonly widgets = [];

  public readonly $config = this.dashboardService.$config;

  private readonly dialog = tuiDialog(DayCardDialogComponent, {
    size: 'page',
    closeable: true,
    dismissible: true,
  });


  public openDayCard(date: Date) {
    this.dialog(date).subscribe();
  }
}
