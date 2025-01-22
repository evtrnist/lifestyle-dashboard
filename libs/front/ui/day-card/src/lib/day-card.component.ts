import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lifestyle-day-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './day-card.component.html',
  styleUrl: './day-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCardComponent {}
