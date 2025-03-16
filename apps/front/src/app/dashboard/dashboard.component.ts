import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@lifestyle-dashboard/calendar';
import { tuiDialog, TuiDialogService } from '@taiga-ui/core';
import { DayCardDialogComponent } from '@lifestyle-dashboard/day-card-dialog';
import { LifestyleConfigService } from '../lifestyle-config.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CalendarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly lifestyleConfigService = inject(LifestyleConfigService);
  private readonly dialogs = inject(TuiDialogService);
  public readonly widgets = [];

  private readonly dialog = tuiDialog(DayCardDialogComponent, {
    size: 'page',
    closeable: true,
    dismissible: true,
  });

  public openDayCard(date: Date) {
    this.dialog(date).subscribe();
    this.lifestyleConfigService.getConfig().subscribe(console.log)
  }
}
