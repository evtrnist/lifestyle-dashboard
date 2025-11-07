import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';
import { CreateOrUpdateDayDataDto, toUTCDateKey } from '@lifestyle-dashboard/day-data';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { DaysResponse } from './day-response';

const URL = '/api/day-data';

@Injectable({ providedIn: 'root' })
export class LifestyleWidgetDataService {
  private readonly httpClient = inject(HttpClient);

  public getData$(startDate: TuiDay, endDate: TuiDay, widgetTypes: WidgetType[]): Observable<DaysResponse> {
    let params = new HttpParams()
      .set('startDate', toUTCDateKey(startDate.toLocalNativeDate()))
      .set('endDate', toUTCDateKey(endDate.toLocalNativeDate()));

    widgetTypes.forEach((type) => {
      params = params.append('widgetTypes', type);
    });

    return this.httpClient.get<DaysResponse>(URL, {
      params,
    });
  }

  public saveDateData$(date: string, widgetType: WidgetType, widgetData: unknown): Observable<any> {
    console.log('Saving date data from service:', { date, widgetType, widgetData });
    const body: CreateOrUpdateDayDataDto = {
      date,
      widgetType,
      widgetData,
    };

    return this.httpClient.post(URL, body);
  }
}
