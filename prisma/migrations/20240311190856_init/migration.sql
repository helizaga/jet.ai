-- CreateTable
CREATE TABLE "Jet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wingspan" DOUBLE PRECISION NOT NULL,
    "numberOfEngines" INTEGER NOT NULL,
    "manufacturingYear" INTEGER NOT NULL,
    "topSpeed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fuelEfficiency" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maximumSeats" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Jet_pkey" PRIMARY KEY ("id")
);
