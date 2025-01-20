import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@lifestyle-dashboard/calendar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CalendarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public readonly widgets = [];
  
}
