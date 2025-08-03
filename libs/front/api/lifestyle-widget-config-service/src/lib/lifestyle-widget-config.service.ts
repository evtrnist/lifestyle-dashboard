import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Config } from '@lifestyle-dashboard/config';
import { tuiTakeUntilDestroyed } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { WidgetConfigResponse } from './widget-config-response';

const URL = '/api/widget-config';

@Injectable({ providedIn: 'root' })
export class LifestyleWidgetConfigService {
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  public readonly $config = signal<Config | null>(null);
  private readonly $configId = signal<string | null>(null);

  public init(): void {
    this.getConfig();
  }

  public getConfig(): void {
    this.getConfig$()
      .pipe(tuiTakeUntilDestroyed(this.destroyRef))
      .subscribe(({id, config}) => {
        this.$config.set(config);
        this.$configId.set(id);
      });
  }

  public updateConfig(config: Partial<Config>): void {
    const id = this.$configId();

    if (!id) {
      console.warn('No config ID found. Cannot update config.');
      return;
    }

    this.httpClient
      .put<WidgetConfigResponse>(`${URL}/${id}`, config)
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

  public deleteConfig(): void {
    const id = this.$configId();

    if (!id) {
      console.warn('No config ID found. Cannot delete config.');
      return;
    }

    this.httpClient
      .delete<WidgetConfigResponse>(`${URL}/${id}`)
      .pipe(tuiTakeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.$config.set(null);
        this.$configId.set(null);
      });
  }

  private getConfig$(): Observable<WidgetConfigResponse> {
    return this.httpClient.get<WidgetConfigResponse>(URL);
  }
}
