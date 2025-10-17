import {
  AfterViewInit,
  Component,
  Injector,
  input,
  output,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-dynamic-host',
  imports: [CommonModule],
  template: `<ng-container #vcRef></ng-container>`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
})
export class DynamicHostComponent implements AfterViewInit {
  public readonly component = input<Type<unknown> | null>(null);
  public readonly injector = input<Injector | null>(null);

  public readonly init = output<unknown>();

  private readonly vcRef = viewChild('vcRef', { read: ViewContainerRef });

  ngAfterViewInit(): void {
    const component = this.component();
    const injector = this.injector();
    if (!component || !injector) {
      return;
    }

    const ref = this.vcRef()?.createComponent(component, { injector });

    this.init.emit(ref?.instance);
  }
}
