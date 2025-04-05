import { TuiRingChart } from '@taiga-ui/addon-charts';

export interface TimeTrackerWidgetInput {
  size: TuiRingChart['size'];
  timeData: {
    routine: number;
    health: number;
    selfDevelopment: number;
    leisure: number;  
  }
}
