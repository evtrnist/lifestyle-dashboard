import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Config } from '@lifestyle-dashboard/config';
import { Prisma, WidgetConfig } from '@prisma/client';

@Injectable()
export class WidgetConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getByUser(userId: string): Promise<WidgetConfig | null> {
    const res = await this.prismaService.widgetConfig.findUnique({
      where: { userId },
    });

    return res;
  }

  public async create(userId: string, config: Config): Promise<WidgetConfig> {
    return this.prismaService.widgetConfig.create({
      data: {
        userId,
        config: config as unknown as Prisma.InputJsonValue,
      },
    });
  }

  public async updateByUser(userId: string, config: Config): Promise<WidgetConfig> {
    return this.prismaService.widgetConfig.update({
      where: { userId },
      data: { config: config as unknown as Prisma.InputJsonValue },
    });
  }

  public async deleteByUser(userId: string): Promise<WidgetConfig> {
    return this.prismaService.widgetConfig.delete({
      where: { userId },
    });
  }
}
