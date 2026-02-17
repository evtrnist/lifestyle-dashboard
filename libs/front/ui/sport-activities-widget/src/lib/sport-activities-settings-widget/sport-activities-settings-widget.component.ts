import { type MaskitoTimeMode } from '@maskito/kit';
import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiTime } from '@taiga-ui/cdk';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiInputTime } from '@taiga-ui/kit';
import { WidgetSettingsComponent } from '@lifestyle-dashboard/widget-contracts';
import { SportActivitiesWidgetInput } from '../sport-activities-widget-input';
import { SPORT_ACTIVITIES_WIDGET_TOKEN } from '../sport-activities-widget.token';

type ActivityField = 'emoji' | 'duration' | 'comment';

const INITIAL_ACTIVITY: Record<Exclude<ActivityField, 'duration'>, string> & { duration: TuiTime } =
  {
    emoji: '',
    duration: new TuiTime(1, 0),
    comment: '',
  };

type ActivityGroup = FormGroup<{
  emoji: FormControl<string>;
  duration: FormControl<TuiTime>;
  comment: FormControl<string>;
}>;

@Component({
  selector: 'lifestyle-dashboard-sport-activities-settings-widget',
  imports: [ReactiveFormsModule, TuiButton, TuiIcon, TuiTextfield, TuiInputTime],
  templateUrl: './sport-activities-settings-widget.component.html',
  styleUrls: ['./sport-activities-settings-widget.component.less'],
})
export class SportActivitiesSettingsWidgetComponent implements WidgetSettingsComponent, OnInit {
  public readonly widgetData = inject<Signal<SportActivitiesWidgetInput>>(
    SPORT_ACTIVITIES_WIDGET_TOKEN,
  );

  public readonly $activities = computed(() => this.widgetData()?.data);

  public form!: FormArray<ActivityGroup>;

  protected readonly mode: MaskitoTimeMode = 'HH:MM';

  public ngOnInit(): void {
    this.form = new FormArray<ActivityGroup>([]);
    const activities = this.$activities();

    if (activities && activities.length) {
      activities.forEach((activity) => {
        const group = new FormGroup({
          emoji: new FormControl<string>(activity.emoji, {
            nonNullable: true,
            validators: [Validators.pattern(/^\p{Extended_Pictographic}+$/u)],
          }),
          duration: new FormControl<TuiTime>(
            new TuiTime(activity.duration.hours, activity.duration.minutes),
            { nonNullable: true },
          ),
          comment: new FormControl<string>(activity.comment, { nonNullable: true }),
        });
        this.form.push(group);
      });
    } else {
      this.form.push(this.getEmptyActivityGroup());
    }
  }

  public addActivity(): void {
    this.form.push(this.getEmptyActivityGroup());
  }

  public removeActivity(index: number): void {
    this.form.removeAt(index);
  }

  private getEmptyActivityGroup(): ActivityGroup {
    return new FormGroup({
      emoji: new FormControl<string>(INITIAL_ACTIVITY.emoji as string, {
        nonNullable: true,
        validators: [Validators.pattern(/^\p{Extended_Pictographic}+$/u)],
      }),
      duration: new FormControl<TuiTime>(INITIAL_ACTIVITY.duration as TuiTime, {
        nonNullable: true,
      }),
      comment: new FormControl<string>(INITIAL_ACTIVITY.comment as string, {
        nonNullable: true,
      }),
    });
  }
}
