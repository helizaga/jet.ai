/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Jet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jet_name_key" ON "Jet"("name");
