import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@lifestyle-dashboard/calendar';
import { tuiDialog, TuiDialogService } from '@taiga-ui/core';
import { DayCardDialogComponent } from '@lifestyle-dashboard/day-card-dialog';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CalendarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly dialogs = inject(TuiDialogService);
  public readonly widgets = [];

  public readonly $config = this.dashboardService.$config;

  private readonly dialog = tuiDialog(DayCardDialogComponent, {
    size: 'page',
    closeable: true,
    dismissible: true,
  });

  ngOnInit() {
    this.dashboardService.init();
  }

  public openDayCard(date: Date) {
    this.dialog(date).subscribe();
  }
}
