import { NextApiRequest, NextApiResponse } from "next";
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // Handle non-POST requests early and exit
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { jets, category } = req.body; // Extracting 'jets' and 'category' from the request body
  // Basic validation for 'jets' and 'category'
  if (
    !jets ||
    !category ||
    !Array.isArray(jets) ||
    jets.length === 0 ||
    typeof category !== "string"
  ) {
    res.status(400).json({
      message:
        "Invalid request format. Please include 'jets' as an array and 'category' as a string.",
    });
    return;
  }

  try {
    // Construct the prompt for OpenAI
    let prompt = `Provide a comparison of only the following private jets based on ${category}, giving a single response for each, using only numerical metrics and units without sentences. Do not include any information on jets not listed below. Format for each should be: '{jet_name}: {metric} {unit}'. Please provide the information in the order the jets are listed. Jets:`;

    jets.forEach((jet, index) => {
      prompt += `\n${index + 1}. ${jet}`;
    });

    // Make the API request to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500,
    });

    const rawResults = response.choices[0].message.content;
    const lines = rawResults.trim().split("\n");
    const processedResults: { [key: string]: string } = {}; // This line changes
    lines.forEach((line: string) => {
      // Extract the jet name and comparison value more accurately
      const match = line.match(/^(?:\d+\. )?([\w\s\-]+): (.+)$/);
      if (match && match.length >= 3) {
        const jetName = match[1];
        const comparisonValue = match[2];

        // Normalize jet names from the original request for accurate comparison
        const normalizedJets = jets.map((jet) =>
          jet.replace(/^\d+\. /, "").trim()
        );

        // Check if the jetName from OpenAI's response is in the original jets list
        if (normalizedJets.includes(jetName)) {
          // This condition ensures each jet is only added once based on the original request
          if (!processedResults[jetName]) {
            processedResults[jetName] = comparisonValue;
          }
        }
      }
    });

    // Send back the simplified key-value pair response
    res.status(200).json(processedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
}
