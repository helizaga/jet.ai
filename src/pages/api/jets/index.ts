import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/prismaClient";
import { Jet } from "../../../types/jet";

// Define the type for the response data explicitly if known, e.g., Jet[]
// This can be replaced with the appropriate type based on your data

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Jet[] | { error: string }>
) {
  try {
    const jets = await prisma.jet.findMany();
    res.status(200).json(jets);
  } catch (error) {
    console.error("Failed to fetch jets:", error);
    res.status(500).json({ error: "Failed to fetch jets" });
  }
}
