import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Config } from '@lifestyle-dashboard/config';

@Injectable()
export class WidgetConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getByUser(userId: string): Promise<Config | null> {
    return this.prismaService.widgetConfig.findUnique({
      where: { userId },
    });
  }

  public async create(userId: string, config: Config): Promise<Config> {
    return this.prismaService.widgetConfig.create({
      data: {
        userId,
        config,
      },
    });
  }

  public async updateByUser(userId: string, config: Config) {
    return this.prismaService.widgetConfig.update({
      where: { userId },
      data: { config },
    });
  }

  public async deleteByUser(userId: string) {
    return this.prismaService.widgetConfig.delete({
      where: { userId },
    });
  }

  public async getWidgetConfig(userId: string): Promise<Config> {
    const config = await this.prismaService.widgetConfig.findUnique({
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
}
