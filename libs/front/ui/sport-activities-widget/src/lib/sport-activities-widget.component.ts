import { Component, computed, inject, Signal } from '@angular/core';
import { TuiHint } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TimePipe } from '@lifestyle-dashboard/time-pipe';
import { SportActivitiesWidgetInput } from './sport-activities-widget-input';
import { SPORT_ACTIVITIES_WIDGET_TOKEN } from './sport-activities-widget.token';

@Component({
  selector: 'lifestyle-dashboard-sport-activities-widget',
  imports: [TimePipe, TuiAvatar, TuiHint],
  templateUrl: './sport-activities-widget.component.html',
  styleUrls: ['./sport-activities-widget.component.less'],
})
export class SportActivitiesWidgetComponent {
  public readonly widgetData = inject<Signal<SportActivitiesWidgetInput>>(
    SPORT_ACTIVITIES_WIDGET_TOKEN,
  );

  public readonly $size = computed(() => this.widgetData()?.size as TuiAvatar['size']);

  public readonly $activities = computed(() => this.widgetData()?.data);
}
