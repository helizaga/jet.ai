import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";

const prisma = new PrismaClient();

async function importCSV() {
  const results: {
    name: string;
    wingspan: string;
    engines: string;
    year: string;
  }[] = [];

  fs.createReadStream("jet_facts.csv")
    .pipe(
      csvParser({
        mapHeaders: ({ header }) => header.trim(), // Adjusts headers to match Prisma model fields
      })
    )
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (let jet of results) {
        await prisma.jet.create({
          data: {
            name: jet.name,
            wingspan: parseFloat(jet.wingspan),
            numberOfEngines: parseInt(jet.engines),
            manufacturingYear: parseInt(jet.year),
          },
        });
      }
      console.log("CSV import completed");
      await prisma.$disconnect();
    });
}

importCSV().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
