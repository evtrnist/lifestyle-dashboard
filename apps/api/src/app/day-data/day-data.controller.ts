import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { DayDataService } from './day-data.service';

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
    return { days: { [widgetType]: data } };
  }

  @Post()
  public async createOrUpdate(@Req() req, @Body() body: any) {
    const userId = req.user?.id || 'default-user';
    const { widgetType, date, widgetData } = body;
    return this.dayDataService.createOrUpdateDayData(
      userId,
      widgetType,
      new Date(date),
      widgetData,
    );
  }
}
