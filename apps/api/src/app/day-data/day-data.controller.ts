import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library';
import { CreateOrUpdateDayDataDto } from '@lifestyle-dashboard/day-data';
import { RequestWithUser } from '../auth/auth.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DayDataService, DaysByDate } from './day-data.service';

@Controller('day-data')
export class DayDataController {
  constructor(private readonly dayDataService: DayDataService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getDaysData(
    @Req() req: RequestWithUser,
    @Query()
    query: {
      widgetTypes?: string[] | string;
      startDate?: string;
      endDate?: string;
    },
  ): Promise<{
    days: DaysByDate;
  }> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException(`No user with id ${userId} found`);
    }

    // widgetTypes может прийти как ['a','b'] или как 'a,b'
    const widgetTypes: string[] = Array.isArray(query.widgetTypes)
      ? query.widgetTypes
      : typeof query.widgetTypes === 'string'
        ? query.widgetTypes
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    if (!widgetTypes.length) {
      throw new BadRequestException('widgetTypes is required');
    }

    const start = query.startDate;
    const end = query.endDate;

    const daysMap = await this.dayDataService.getDaysDataForWidgets(
      userId,
      widgetTypes,
      start,
      end,
    );

    // Формат ответа: { days: { [widgetType]: { 'YYYY-MM-DD': { widgetType, data } } } }
    return { days: daysMap };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createOrUpdate(
    @Req() req: RequestWithUser,
    @Body() body: CreateOrUpdateDayDataDto,
  ): Promise<{
    date: string;
    widgetType: string;
    id: string;
    userId: string;
    data: JsonValue;
    createdAt: Date;
    updatedAt: Date;
  }> {
    console.log('Received createOrUpdate request with body:', body);
    const userId = req.user?.id;

    if (!userId) {
      throw new BadRequestException(`User ${userId} not found`);
    }

    const { widgetType, date, widgetData } = body;

    return this.dayDataService.createOrUpdateDayData(
      userId,
      widgetType,
      date,
      widgetData as InputJsonValue,
    );
  }
}
