import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeType = 'accent' | 'success' | 'danger';

@Component({
  selector: 'lifeel-badge',
  template: `<ng-content></ng-content>`,
  styleUrls: [`./badge.component.less`],
  host: {
    '[class]': `'lifeel-badge lifeel-badge--' + type()`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeelBadge {
  public readonly type = input.required<BadgeType>();
}
