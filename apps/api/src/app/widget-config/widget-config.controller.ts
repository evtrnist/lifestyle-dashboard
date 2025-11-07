import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { WidgetConfig } from '@prisma/client';
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';
import { RequestWithUser } from '../auth/auth.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WidgetConfigService } from './widget-config.service';

@UseGuards(JwtAuthGuard)
@Controller('widget-config')
export class WidgetConfigController {
  constructor(private readonly widgetConfigService: WidgetConfigService) {}

  @Get()
  public async getUserConfig(@Req() req: RequestWithUser): Promise<WidgetConfig | null> {
    console.log('Getting widget config for user:', req.user);
    const userId = req.user['id'];

    return this.widgetConfigService.getByUser(userId);
  }

  @Post()
  public async create(
    @Req() req: RequestWithUser,
    @Body() config: InputJsonValue,
  ): Promise<{
    id: string;
    userId: string;
    config: JsonValue;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const userId = req.user['id'];

    return this.widgetConfigService.create(userId, config);
  }

  @Put(':id')
  public async update(
    @Req() req: RequestWithUser,
    @Body() config: InputJsonValue,
  ): Promise<{
    id: string;
    userId: string;
    config: JsonValue;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const userId = req.user['id'];

    return this.widgetConfigService.updateByUser(userId, config);
  }

  @Delete(':id')
  public async delete(@Req() req: RequestWithUser): Promise<{
    id: string;
    userId: string;
    config: JsonValue;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const userId = req.user['id'];

    return this.widgetConfigService.deleteByUser(userId);
  }
}
