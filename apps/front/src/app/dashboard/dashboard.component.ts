import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { tuiDialog } from '@taiga-ui/core';
import { CalendarComponent } from '@lifestyle-dashboard/calendar';
import { DayCardDialogComponent, DayCardDialogContext } from '@lifestyle-dashboard/day-card-dialog';
import { DashboardService } from './dashboard.service';
import { LifestyleWidgetConfigService } from 'libs/front/api/lifestyle-widget-config-service/src/lib/lifestyle-widget-config.service';

@Component({
  selector: 'app-dashboard',
  imports: [CalendarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
    private readonly lifestyleConfigService = inject(LifestyleWidgetConfigService);

  private readonly dashboardService = inject(DashboardService);
  public readonly $config = this.dashboardService.$config;

  private readonly dialog = tuiDialog(DayCardDialogComponent, {
    size: 'page',
    closeable: true,
    dismissible: true,
  });

    ngOnInit() {
    this.lifestyleConfigService.init();
  }


  public openDayCard({ date, calendarData }: DayCardDialogContext) {
    console.log('Opening day card form dashboard for date:', date);
    this.dialog({ date, calendarData }).subscribe();
  }
}
