import {
  Component,
  ComponentRef,
  DestroyRef,
  effect,
  inject,
  Injector,
  input,
  output,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'lib-dynamic-host',
  template: `<ng-container #vcRef></ng-container>`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `,
  ],
  standalone: true,
})
export class DynamicHostComponent {
  public readonly component = input<Type<unknown> | null>(null);
  public readonly injector = input<Injector | null>(null);

  public readonly init = output<unknown>();

  private readonly vcRef = viewChild('vcRef', { read: ViewContainerRef });
  private readonly destroyRef = inject(DestroyRef);

  private cmpRef: ComponentRef<unknown> | null = null;

  constructor() {
    effect(
      () => {
        const vc = this.vcRef();
        const cmp = this.component();
        const inj = this.injector() ?? inject(Injector);

        if (!vc || !cmp || !inj) {
          return;
        }

        this.cmpRef?.destroy();
        vc.clear();

        this.cmpRef = vc.createComponent(cmp, { injector: inj });

        this.init.emit(this.cmpRef.instance);
      },
      { allowSignalWrites: true },
    );
  }
}
