import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Config } from '@lifestyle-dashboard/config';
import { tuiTakeUntilDestroyed } from '@taiga-ui/cdk';
import { map, Observable } from 'rxjs';
import { WidgetConfigResponse } from './widget-config-response';

const URL = '/api/widget-config';

@Injectable({ providedIn: 'root' })
export class LifestyleWidgetConfigService {
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  public readonly $config = signal<Config | null>(null);

  public init(): void {
    this.getConfig();
  }

  public getConfig(): void {
    this.getConfig$()
      .pipe(tuiTakeUntilDestroyed(this.destroyRef))
      .subscribe((config) => {
        this.$config.set(config);
      });
  }

  public updateConfig(config: Partial<Config>): void {
    this.httpClient
      .put<WidgetConfigResponse>(URL, config)
      .pipe(tuiTakeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.$config.set(data.config as Config);
      });
  }

  public createConfig(newConfig: Partial<Config>): void {
    this.httpClient
      .post<WidgetConfigResponse>(URL, newConfig)
      .pipe(tuiTakeUntilDestroyed(this.destroyRef))
      .subscribe(({ config }) => {
        this.$config.set(config as Config);
      });
  }

  private getConfig$(): Observable<Config> {
    return this.httpClient.get<WidgetConfigResponse>(URL).pipe(
      map((response) => response.config)
    );
  }
}
