import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TuiRingChart} from '@taiga-ui/addon-charts';

@Component({
  selector: 'lifestyle-timetracker-widget',
  imports: [CommonModule, TuiRingChart],
  standalone: true,
  templateUrl: './timetracker-widget.component.html',
  styleUrl: './timetracker-widget.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetrackerWidgetComponent {
  public readonly $value = signal([20,40, 25, 15]);
}
