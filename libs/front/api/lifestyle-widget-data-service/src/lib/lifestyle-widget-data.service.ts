import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { CreateOrUpdateDayDataDto } from '@lifestyle-dashboard/day-data';

const URL = '/api/day-data';

@Injectable({ providedIn: 'root' })
export class LifestyleWidgetDataService {
  private readonly httpClient = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  public readonly $data = signal<any | null>(null);

  public getData(startDate: TuiDay, endDate: TuiDay): void {
    this.getData$(startDate, endDate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.$data.set(data);
      });
  }

  public saveDateData$(date: string, widgetType: WidgetType, widgetData: unknown): Observable<any> {
    const body: CreateOrUpdateDayDataDto = {
        date,
        widgetType,
        widgetData,
    };
    
    return this.httpClient.post(URL, body);
  }

  private getData$(startDate: TuiDay, endDate: TuiDay): Observable<any> {
    return this.httpClient.get<any>(URL);
  }
}
