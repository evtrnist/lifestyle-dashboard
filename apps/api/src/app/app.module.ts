import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WidgetConfigModule } from './widget-config/widget-config.module';
import { DayDataModule } from './day-data/day-data.module';

@Module({
  imports: [PrismaModule, WidgetConfigModule, DayDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
