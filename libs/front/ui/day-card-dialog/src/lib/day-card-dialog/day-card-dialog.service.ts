import { inject, Injectable } from "@angular/core";
import { LifestyleConfigService } from "@lifestyle-dashboard/lifestyle-config-service";

@Injectable()
export class DayCardDialogService {
    private readonly configService = inject(LifestyleConfigService);
}