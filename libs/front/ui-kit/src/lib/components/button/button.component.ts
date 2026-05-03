import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Size, Variant } from '../../tokens/tokens';

@Component({
  selector: 'lifeel-button, button[lifeelbutton], a[lifeelbutton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',

    '[attr.aria-disabled]': 'disabled() || loading() ? "true" : null',

    '[attr.disabled]': 'isNativeButtonDisabled() ? "" : null',
  },
})
export class LifeelButton {
  public readonly variant = input<Variant>('primary');
  public readonly size = input<Size>('md');

  public readonly disabled = input<boolean>(false);
  public readonly loading = input<boolean>(false);

  protected readonly hostClasses = computed(() => {
    return [
      'lifeel-button',
      `lifeel-button--${this.variant()}`,
      `lifeel-button--${this.size()}`,
      this.disabled() ? 'is-disabled' : '',
      this.loading() ? 'is-loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected readonly isNativeButtonDisabled = computed(() => this.disabled() || this.loading());
}
