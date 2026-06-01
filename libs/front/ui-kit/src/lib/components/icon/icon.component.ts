import { LucideDynamicIcon } from '@lucide/angular';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LIFEEL_ICONS, LifeelIconName } from './icon.registry';

@Component({
  selector: 'lifeel-icon',
  standalone: true,
  template: `<svg
    [lucideIcon]="icon()"
    [size]="size()"
    [strokeWidth]="strokeWidth()"
    [color]="color()"
  ></svg>`,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeelIcon {
  public readonly name = input.required<LifeelIconName>();
  public readonly color = input<string>('currentColor');
  public readonly size = input<number>(16);
  public readonly strokeWidth = input<number>(2);
  protected readonly icon = computed(() => LIFEEL_ICONS[this.name()]);
}
