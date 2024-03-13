/*
  Warnings:

  - You are about to alter the column `topSpeed` on the `Jet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Jet" ALTER COLUMN "topSpeed" DROP NOT NULL,
ALTER COLUMN "topSpeed" SET DEFAULT 0,
ALTER COLUMN "topSpeed" SET DATA TYPE INTEGER,
ALTER COLUMN "fuelEfficiency" DROP NOT NULL,
ALTER COLUMN "maximumSeats" DROP NOT NULL;
