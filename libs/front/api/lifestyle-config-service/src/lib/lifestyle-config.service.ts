import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config } from '@lifestyle-dashboard/config';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/config';

@Injectable({ providedIn: 'root' })
export class LifestyleConfigService {
  private readonly httpClient = inject(HttpClient);

  public getConfig(): Observable<Config> {
    return this.httpClient.get<Config>(URL);
  }
}
