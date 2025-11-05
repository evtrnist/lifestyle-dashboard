import { Module } from '@nestjs/common';
import { WidgetConfigController } from './widget-config.controller';
import { WidgetConfigService } from './widget-config.service';

@Module({
  providers: [WidgetConfigService],
  controllers: [WidgetConfigController],
  exports: [WidgetConfigService],
})
export class WidgetConfigModule {}
