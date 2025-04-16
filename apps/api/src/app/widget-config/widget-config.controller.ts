import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { WidgetConfigService } from './widget-config.service';
import { Config } from '@lifestyle-dashboard/config';

@Controller('widget-config')
export class WidgetConfigController {
  constructor(private readonly widgetConfigService: WidgetConfigService) {}

  @Get()
  async getWidgetConfig(@Req() req: any): Promise<Config> {
    return await this.widgetConfigService.getWidgetConfig(req.user.id);
  }

  @Put()
  async updateConfig(@Req() req: any, @Body() body: any) {
    const userId = req.user?.id || 'default-user';
    return this.widgetConfigService.updateWidgetConfigForUser(
      userId,
      body.config,
    );
  }
}
