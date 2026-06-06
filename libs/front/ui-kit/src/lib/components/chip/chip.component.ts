import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CategoryKey, Size, Variant } from '../../tokens/tokens';

@Component({
  selector: 'lifeel-chip',
  template: `
    @let isFilter = filter();
    <ng-content select="chip-icon"></ng-content>

    <span>
      @if (isFilter) {
        Filter:
      }

      <ng-content select="chip-label"></ng-content>
    </span>

    @if (isFilter) {
      <button
        type="button"
        class="close-button"
        aria-label="Remove filter"
        (click)="removeFilter()"
      >
        ×
      </button>
    }
  `,
  styleUrls: [`./chip.component.less`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
  },
  standalone: true,
})
export class LifeelChip {
  public readonly variant = input<CategoryKey | Variant>('primary');
  public readonly filter = input<boolean>(false);

  public readonly size = input<Size>('m');

  public readonly removedFilter = output<void>();

  protected readonly hostClasses = computed(() => {
    return [
      'lifeel-chip',
      `lifeel-chip--${this.variant()}`,
      `lifeel-chip--${this.size()}`,
      this.filter() ? 'is-filter' : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected removeFilter(): void {
    this.removedFilter.emit();
  }
}
