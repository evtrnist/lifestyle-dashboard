import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Config } from '@lifestyle-dashboard/config';

@Injectable()
export class WidgetConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllByUser(userId: string): Promise<Config[]> {
    return this.prismaService.widgetConfig.findMany({
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

  public async update(
    id: string,
    userId: string,
    config: Config,
  ): Promise<Config> {
    return this.prismaService.widgetConfig.updateMany({
      where: {
        id,
        userId,
      },
      data: { config },
    });
  }

  public async delete(id: string, userId: string): Promise<void> {
    return this.prismaService.widgetCOnfig.deleteMany({
      id,
      userId,
    });
  }

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
}
