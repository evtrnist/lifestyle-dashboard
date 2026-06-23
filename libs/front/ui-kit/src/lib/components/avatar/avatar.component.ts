import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Size } from '../../tokens/tokens';

@Component({
  selector: 'lifeel-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less'],
  standalone: true,
  host: {
    '[class]': 'hostClasses()',
  },

  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeelAvatar {
  public readonly size = input.required<Size>();

  public readonly src = input<string | null>(null);

  public readonly initials = input<string>('');

  public readonly isSquare = input<boolean>(false);

  protected readonly hostClasses = computed(() => {
    return ['lifeel-avatar', `lifeel-avatar--${this.size()}`, this.isSquare() ? 'is-square' : '']
      .filter(Boolean)
      .join(' ');
  });
}
