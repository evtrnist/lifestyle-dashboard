import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WidgetConfigService } from './widget-config.service';
import { Config } from '@lifestyle-dashboard/config';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../auth/auth.controller';

@UseGuards(JwtAuthGuard)
@Controller('widget-config')
export class WidgetConfigController {
  constructor(private readonly widgetConfigService: WidgetConfigService) {}

  @Get()
  public async getAll(@Req() req: RequestWithUser) {
    const userId = req.user['sub'];

    return this.widgetConfigService.getAllByUser(userId);
  }

  @Post()
  public async create(@Req() req: RequestWithUser, @Body() config: Config) {
    const userId = req.user['sub'];

    return this.widgetConfigService.create(userId, config);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() config: Config,
  ) {
    const userId = req.user['sub'];

    return this.widgetConfigService.update(id, userId, config);
  }

  @Delete(':id')
  public async delete(@Req() req: RequestWithUser, @Param('id') id: string) {
    const userId = req.user['sub'];

    return this.widgetConfigService.delete(id, userId);
  }
}
