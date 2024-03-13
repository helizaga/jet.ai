import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../prisma/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the HTTP method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    // Convert id to number and query the database
    const jet = await prisma.jet.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (jet) {
      res.status(200).json(jet);
    } else {
      res.status(404).json({ message: "Jet not found" });
    }
  } catch (error: any) {
    let errorMessage: string;

    // Check if error is an instance of Error and has a message property
    if (error instanceof Error && error.message) {
      errorMessage = error.message;
    } else {
      // Provide a generic error message if the caught error doesn't have a message property
      errorMessage = "An unexpected error occurred";
    }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorMessage });
  }
}
