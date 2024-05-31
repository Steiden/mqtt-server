/*
  Warnings:

  - Added the required column `sumPower` to the `Consumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sumVoltage` to the `Consumption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consumption" ADD COLUMN     "sumPower" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sumVoltage" DOUBLE PRECISION NOT NULL;
