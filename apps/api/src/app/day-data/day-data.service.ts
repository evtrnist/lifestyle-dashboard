import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class DayDataService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getDaysDataForWidget(
    userId: string,
    widgetType: WidgetType,
    startDate: Date,
    endDate: Date,
  ) {
    const data = await this.prismaService.dayData.findMany({
      where: {
        userId,
        widgetType,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { date: 'asc' },
    });

    return data.map((d) => d.data);
  }

  public async createOrUpdateDayData(
    userId: string,
    widgetType: string,
    date: Date,
    widgetData: InputJsonValue,
  ) {
    console.log('Creating or updating day data:', { userId, widgetType, date, widgetData });
    
    const existing = await this.prismaService.dayData.findFirst({
      where: { userId, widgetType, date },
    });

    if (existing) {
      return this.prismaService.dayData.update({
        where: { id: existing.id },
        data: { data: widgetData },
      });
    }

    return this.prismaService.dayData.create({
      data: { userId, widgetType, date, data: widgetData },
    });
  }
}
