import { Config } from '@lifestyle-dashboard/config';

export interface WidgetConfigResponse {
  config: Config;
  id: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
