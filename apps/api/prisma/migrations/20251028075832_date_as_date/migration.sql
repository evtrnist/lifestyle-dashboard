/*
  Warnings:

  - A unique constraint covering the columns `[userId,widgetType,date]` on the table `DayData` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `WidgetConfig` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DayData" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "DayData_userId_widgetType_date_key" ON "DayData"("userId", "widgetType", "date");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetConfig_userId_key" ON "WidgetConfig"("userId");
