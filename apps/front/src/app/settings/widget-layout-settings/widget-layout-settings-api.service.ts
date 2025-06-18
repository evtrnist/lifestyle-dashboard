import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class WidgetLayoutSettingsApiService {
      private readonly httpClient = inject(HttpClient);

}