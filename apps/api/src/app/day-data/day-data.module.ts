import { Module } from '@nestjs/common';
import { DayDataController } from './day-data.controller';
import { DayDataService } from './day-data.service';

@Module({
  providers: [DayDataService],
  controllers: [DayDataController],
  exports: [DayDataService],
})
export class DayDataModule {}
