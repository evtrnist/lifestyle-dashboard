import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { WidgetType } from '@lifestyle-dashboard/widget-contracts';
import { PrismaService } from '../prisma/prisma.service';

export function ymdToUTCDate(ymd: string): Date {
  // "2025-10-01" -> 2025-10-01T00:00:00.000Z
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function dateToYMD(date: Date): string {
  // Prisma вернёт полуночь UTC -> отдадим "YYYY-MM-DD"
  return date.toISOString().slice(0, 10);
}

export type DaysByDate = Record<string, Record<string, Prisma.JsonValue>>;

@Injectable()
export class DayDataService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getDaysDataForWidgets(
    userId: string,
    widgetTypes: string[],
    startDate: string,
    endDate: string,
  ): Promise<DaysByDate> {
    const gte = new Date(startDate).toISOString();
    const lte = new Date(endDate).toISOString();

    console.log(
      'Fetching days data for user:',
      userId,
      'widgetTypes:',
      widgetTypes,
      'from',
      gte,
      'to',
      lte,
    );

    const rows = await this.prismaService.dayData.findMany({
      where: {
        userId,
        widgetType: { in: widgetTypes },
        date: { gte, lte },
      },
      select: { date: true, widgetType: true, data: true },
      orderBy: [{ date: 'asc' }, { widgetType: 'asc' }],
    });

    const result: DaysByDate = {};

    for (const row of rows) {
      const dayKey = dateToYMD(row.date);
      console.log('Processing row for date:', dayKey);
      if (!result[dayKey]) {
        result[dayKey] = {};
      }

      result[dayKey][row.widgetType as WidgetType] = row.data as Prisma.JsonValue;
    }

    return result;
  }

  public async createOrUpdateDayData(
    userId: string,
    widgetType: string,
    dateYmd: string, // "YYYY-MM-DD"
    widgetData: InputJsonValue,
  ): Promise<{
    date: string;
    widgetType: string;
    id: string;
    userId: string;
    data: Prisma.JsonValue;
    createdAt: Date;
    updatedAt: Date;
  }> {
    const row = await this.prismaService.dayData.upsert({
      where: {
        day_unique: { userId, widgetType, date: ymdToUTCDate(dateYmd) },
      },
      update: { data: widgetData },
      create: {
        userId,
        widgetType,
        date: ymdToUTCDate(dateYmd),
        data: widgetData,
      },
    });

    // нормализуем ответ под фронт: "YYYY-MM-DD" вместо Date
    return {
      ...row,
      date: dateToYMD(row.date),
    };
  }
}
