import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lifeel-divider',
  template: ` <ng-content /> `,
  styleUrls: ['./divider.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeelDivider {}
