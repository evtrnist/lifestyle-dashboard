import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Size, Variant } from '../../tokens/tokens';
import { LifeelIcon } from '../icon/icon.component';
import { LifeelIconName } from '../icon/icon.registry';

@Component({
  selector: 'lifeel-button, button[lifeelButton], a[lifeelButton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',

    '[attr.aria-disabled]': '$disabled() || $loading() ? "true" : null',

    '[attr.disabled]': 'isNativeButtonDisabled() ? "" : null',
  },
  imports: [LifeelIcon],
})
export class LifeelButton {
  public readonly $variant = input<Variant>('primary', { alias: 'variant' });
  public readonly $size = input<Size>('m', { alias: 'size' });

  public readonly $disabled = input<boolean>(false, { alias: 'disabled' });
  public readonly $loading = input<boolean>(false, { alias: 'loading' });

  public readonly $iconStart = input<LifeelIconName | null>(null, { alias: 'iconStart' });
  public readonly $iconEnd = input<LifeelIconName | null>(null, { alias: 'iconEnd' });

  protected readonly hostClasses = computed(() => {
    return [
      'lifeel-button',
      `lifeel-button--${this.$variant()}`,
      `lifeel-button--${this.$size()}`,
      this.$disabled() ? 'is-disabled' : '',
      this.$loading() ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected readonly isNativeButtonDisabled = computed(() => this.$disabled() || this.$loading());
}
