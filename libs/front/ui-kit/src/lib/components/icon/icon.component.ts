import { LucideAngularModule } from 'lucide-angular';
import { Component, input } from '@angular/core';

@Component({
  selector: 'lifeel-icon',
  standalone: true,
  template: `<lucide-icon [name]="name()" [size]="size()" [strokeWidth]="strokeWidth()" />`,
  imports: [LucideAngularModule],
})
export class LifeelIcon {
  public readonly name = input.required<string>();
  public readonly size = input<number>(16);
  public readonly strokeWidth = input<number>(2);
}
