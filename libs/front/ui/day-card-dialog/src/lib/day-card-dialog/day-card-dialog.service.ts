import { computed, inject, Injectable } from "@angular/core";
import { LifestyleConfigService } from "@lifestyle-dashboard/lifestyle-config-service";
import { tuiIsPresent } from "@taiga-ui/cdk";

@Injectable()
export class DayCardDialogService {
    private readonly configService = inject(LifestyleConfigService);

    public readonly $config = this.configService.$config;

    public readonly $tabs = computed(() => {
        const config = this.$config();

        if (!config) {
            return [];
        }
        console.log(config)
        return Object.values(config.layout).filter(tuiIsPresent)
    })
}