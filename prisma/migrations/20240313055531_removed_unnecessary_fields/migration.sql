/*
  Warnings:

  - You are about to drop the column `fuelEfficiency` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `maximumSeats` on the `Jet` table. All the data in the column will be lost.
  - You are about to drop the column `topSpeed` on the `Jet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jet" DROP COLUMN "fuelEfficiency",
DROP COLUMN "maximumSeats",
DROP COLUMN "topSpeed";
