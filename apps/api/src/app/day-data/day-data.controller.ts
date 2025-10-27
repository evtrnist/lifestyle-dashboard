import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DayDataService } from './day-data.service';
import { CreateOrUpdateDayDataDto } from '@lifestyle-dashboard/day-data';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('day-data')
export class DayDataController {
  constructor(private readonly dayDataService: DayDataService) {}

  @Get()
  public async getDaysData(@Req() req, @Query() query: any) {
    const userId = req.user?.id || 'default-user';
    const { widgetType, startDate, endDate } = query;
    const data = await this.dayDataService.getDaysDataForWidget(
      userId,
      widgetType,
      new Date(startDate),
      new Date(endDate),
    );

    console.log('Retrieved day data:', { days: { [widgetType]: data } });

    return { days: { [widgetType]: data } };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createOrUpdate(@Req() req, @Body() body: CreateOrUpdateDayDataDto) {
    console.log('Received createOrUpdate request with body:', body);
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestException(`User ${userId} not found`);
    }

    const { widgetType, date, widgetData } = body;

    return this.dayDataService.createOrUpdateDayData(
      userId,
      widgetType,
      new Date(date),
      widgetData as InputJsonValue,
    );
  }
}
