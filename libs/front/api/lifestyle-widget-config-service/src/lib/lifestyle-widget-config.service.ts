import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Config } from '@lifestyle-dashboard/config';
import { catchError, EMPTY, Observable } from 'rxjs';
import { WidgetConfigResponse } from './widget-config-response';
import { State } from '@lifestyle-dashboard/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const URL = '/api/widget-config';

@Injectable({ providedIn: 'root' })
export class LifestyleWidgetConfigService {
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  public readonly $config = signal<Config | null>(null);
  public readonly $state = signal<State | null>(null);
  private readonly $userId = signal<string | null>(null);

  public init(): void {
    this.getConfig();
  }

  public getConfig(): void {
    this.getConfig$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ userId, config }) => {
        this.$config.set(config);
        this.$userId.set(userId);
      });
  }

  public updateConfig(config: Partial<Config>): void {
    const userId = this.$userId();

    if (!userId) {
      console.warn('No user ID found. Cannot update config.');
      return;
    }

    this.$state.set(State.Loading);

    this.httpClient
      .put<WidgetConfigResponse>(`${URL}/${userId}`, config)
      .pipe(
        catchError((err) => {
          console.warn('Update config failed', err);
          this.$state.set(State.Error);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data) => {
        this.$config.set(data.config as Config);
        this.$state.set(State.Success);
      });
  }

  public createConfig(newConfig: Partial<Config>): void {
    this.$state.set(State.Loading);

    this.httpClient
      .post<WidgetConfigResponse>(URL, newConfig)
      .pipe(
        catchError((err) => {
          console.warn('Create config failed', err);
          this.$state.set(State.Error);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ config }) => {
        this.$config.set(config as Config);
        this.$state.set(State.Success);
      });
  }

  public deleteConfig(): void {
    const userId = this.$userId();

    if (!userId) {
      console.warn('No user ID found. Cannot delete config.');
      return;
    }

    this.httpClient
      .delete<WidgetConfigResponse>(`${URL}/${userId}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.$config.set(null);
        this.$userId.set(null);
      });
  }

  private getConfig$(): Observable<WidgetConfigResponse> {
    return this.httpClient.get<WidgetConfigResponse>(URL);
  }
}
