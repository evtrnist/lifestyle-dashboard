import { TuiTime } from '@taiga-ui/cdk';

export interface SportActivitiesWidgetInput {
  size: string;
  data: SportActivityData[];
}

export interface SportActivityData {
  emoji: string;
  duration: TuiTime;
  comment: string;
}
