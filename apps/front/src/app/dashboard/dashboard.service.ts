import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { Config } from '@lifestyle-dashboard/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LifestyleConfigService } from '@lifestyle-dashboard/lifestyle-config-service';

@Injectable()
export class DashboardService {
  private readonly lifestyleConfigService = inject(LifestyleConfigService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly $config = signal<Config | null>(null);

  private readonly updatingSubject$ = new Subject<void>();

  constructor() {
    this.setSubscriptionToGettingConfig();
  }

  public init() {
    this.updatingSubject$.next();
  }

  private setSubscriptionToGettingConfig() {
    this.updatingSubject$
      .pipe(
        switchMap(() => this.lifestyleConfigService.getConfig()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((config) => {
        this.$config.set(config);
        console.log('config', config);
      });
  }
}
