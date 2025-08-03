import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WidgetConfigService } from './widget-config.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.controller';
import { WidgetConfig } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';

@UseGuards(JwtAuthGuard)
@Controller('widget-config')
export class WidgetConfigController {
  constructor(private readonly widgetConfigService: WidgetConfigService) {}

  @Get()
  public async getUserConfig(
    @Req() req: RequestWithUser,
  ): Promise<WidgetConfig | null> {
    const userId = req.user['sub'];

    return this.widgetConfigService.getByUser(userId);
  }

  @Post()
  public async create(@Req() req: RequestWithUser, @Body() config: InputJsonValue) {
    const userId = req.user['sub'];

    return this.widgetConfigService.create(userId, config);
  }

  @Put(':id')
  public async update(@Req() req: RequestWithUser, @Body() config: InputJsonValue) {
    const userId = req.user['sub'];

    return this.widgetConfigService.updateByUser(userId, config);
  }

  @Delete(':id')
  public async delete(@Req() req: RequestWithUser) {
    const userId = req.user['sub'];

    return this.widgetConfigService.deleteByUser(userId);
  }
}
