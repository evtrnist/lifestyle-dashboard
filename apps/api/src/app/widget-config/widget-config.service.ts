import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Config } from '@lifestyle-dashboard/config';

@Injectable()
export class WidgetConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getWidgetConfig(userId: string): Promise<Config> {
    const config = await this.prismaService.widgetConfig.findFirst({
      where: {
        userId,
      },
    });

    if (config) {
      return config.config;
    }
    // Default
    return {
      layout: {
        'top-left': null,
        'top-middle': null,
        'top-right': null,
        'middle-left': null,
        middle: null,
        'middle-right': null,
        'bottom-left': null,
        'bottom-middle': null,
        'bottom-right': null,
      },
    };
  }

  public async updateWidgetConfigForUser(userId: string, widgetConfig: Config): Promise<Config> {
    const existing = await this.prismaService.widgetConfig.findFirst({
      where: { userId },
    });

    if (existing) {
      return this.prismaService.widgetConfig.update({
        where: { id: existing.id },
        data: { config: widgetConfig },
      });
    } else {
      return this.prismaService.widgetConfig.create({
        data: {
          userId,
          config: widgetConfig,
        },
      });
    }
  }
}
