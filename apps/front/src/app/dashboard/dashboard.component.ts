import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CalendarComponent } from '@lifestyle-dashboard/calendar';
import { tuiDialog } from '@taiga-ui/core';
import { DayCardDialogComponent, DayCardDialogContext } from '@lifestyle-dashboard/day-card-dialog';
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
  public readonly $config = this.dashboardService.$config;

  private readonly dialog = tuiDialog(DayCardDialogComponent, {
    size: 'page',
    closeable: true,
    dismissible: true,
  });

  public openDayCard({date, calendarData}: DayCardDialogContext) {
    console.log('Opening day card form dashboard for date:', date);
    this.dialog({date, calendarData}).subscribe();
  }
}
