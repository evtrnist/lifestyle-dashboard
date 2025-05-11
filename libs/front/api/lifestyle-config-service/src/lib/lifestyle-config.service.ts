import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Config } from '@lifestyle-dashboard/config';
import { tuiTakeUntilDestroyed } from '@taiga-ui/cdk';
import { Observable, Subject } from 'rxjs';

const URL = '/api/widget-config';

@Injectable({ providedIn: 'root' })
export class LifestyleConfigService {
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  public readonly $config = signal<Config | null>(null);

  private readonly updatingSubject$ = new Subject<void>();

  public init(): void {
    this.updateConfig();
  }

  public updateConfig(): void {
    this.getConfig$()
      .pipe(tuiTakeUntilDestroyed(this.destroyRef))
      .subscribe((config) => {
        this.$config.set(config);
      });
  }

  private getConfig$(): Observable<Config> {
    return this.httpClient.get<Config>(URL);
  }
}
