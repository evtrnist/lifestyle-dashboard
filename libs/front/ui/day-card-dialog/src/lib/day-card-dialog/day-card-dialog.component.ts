import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiIconPipe, type TuiDialogContext } from '@taiga-ui/core';
import { TuiTabs } from '@taiga-ui/kit';
import { DayCardDialogService } from './day-card-dialog.service';
import {
  WidgetIconPipe,
  WidgetNamePipe,
} from '@lifestyle-dashboard/widget-name-pipe';
@Component({
  selector: 'lifestyle-day-card-dialog',
  standalone: true,
  imports: [CommonModule, TuiTabs, TuiIconPipe, WidgetNamePipe, WidgetIconPipe],
  templateUrl: './day-card-dialog.component.html',
  styleUrl: './day-card-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DayCardDialogService],
})
export class DayCardDialogComponent {
  private readonly dayCardDialogService = inject(DayCardDialogService);
  public readonly context = injectContext<TuiDialogContext<Date, Date>>();

  public readonly $tabs = this.dayCardDialogService.$tabs;

  protected activeItemIndex = 0;

  protected onClick(item: string): void {
    console.log(item);
  }
}
