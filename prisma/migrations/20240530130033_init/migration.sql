/*
  Warnings:

  - Added the required column `created_at` to the `Consumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `power` to the `Consumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voltage` to the `Consumption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consumption" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "power" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "voltage" DOUBLE PRECISION NOT NULL;
