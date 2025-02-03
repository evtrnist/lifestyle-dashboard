import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectContext } from '@taiga-ui/polymorpheus';
import type { TuiDialogContext } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';

@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [CommonModule, TuiTabs],
  templateUrl: './day-card-dialog.component.html',
  styleUrl: './day-card-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCardDialogComponent {
  public readonly context = injectContext<TuiDialogContext<Date, Date>>();

  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log(item);
  }
}
