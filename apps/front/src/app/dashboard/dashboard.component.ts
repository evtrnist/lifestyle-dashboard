import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';
import { tuiDialog } from '@taiga-ui/core';
import { CalendarComponent } from '@lifestyle-dashboard/calendar';
import { DayCardDialogComponent, DayCardDialogContext } from '@lifestyle-dashboard/day-card-dialog';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';
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
export class DashboardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly lifestyleConfigService = inject(LifestyleWidgetConfigService);

  private readonly dashboardService = inject(DashboardService);
  public readonly $config = this.dashboardService.$config;

  private readonly dialog = tuiDialog(DayCardDialogComponent, {
    size: 'l',

    closeable: true,
    dismissible: true,
  });

  public ngOnInit(): void {
    this.lifestyleConfigService.init();
  }

  public openDayCard({ date, calendarData }: DayCardDialogContext): void {
    this.dialog({ date, calendarData })
      .pipe(
        catchError((error) => {
          console.warn(error);

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
