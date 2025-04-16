import { Module } from '@nestjs/common';
import { WidgetConfigService } from './widget-config.service';
import { WidgetConfigController } from './widget-config.controller';

@Module({
  providers: [WidgetConfigService],
  controllers: [WidgetConfigController],
  exports: [WidgetConfigService],
})
export class WidgetConfigModule {}
