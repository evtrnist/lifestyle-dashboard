import { Module } from '@nestjs/common';
import { DayDataService } from './day-data.service';
import { DayDataController } from './day-data.controller';

@Module({
  providers: [DayDataService],
  controllers: [DayDataController],
  exports: [DayDataService],
})
export class DayDataModule {}
