import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectContext } from '@taiga-ui/polymorpheus';
import type { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-card-dialog.component.html',
  styleUrl: './day-card-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCardDialogComponent {
  public readonly context = injectContext<TuiDialogContext<Date, Date>>();
}
