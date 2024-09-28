import OpenAI from "openai";
import FilterParser, { FilterResult } from "../types/FilterParser";
import parseExpressionFilter from "./parseExpressionFilter";

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const createMessage = (query: string) => `
You are an assistant that helps create a filter string based on the 1) Filter string rules, 
2) Column Names, and 3) NL query.

The filter string rules:
- A single filter is a combination of Column Name - Filter Operation - Value
- The filter supports only two operations: Exact Match (=) and Partial Match (=~)  
- You can combine multiple filters using the "AND" logical operator.

Here is a valid example string: 
  "title" =~ "Christmas" AND "release_year" = 1993 AND "writer" = "Tim Burton"

The available column names:
- Title
- Release Year
- Locations
- Fun Facts
- Production Company
- Distributor
- Director
- Writer
- Actor 1
- Actor 2
- Actor 3

Answer with the generated filter.
If no filter can be generated, answer with "null"

The search query that needs to be parsed and a filter string generated for: ${query}

`;

const parseNLPFilter: FilterParser = async (
  filter: string,
): Promise<FilterResult> => {
  if (!filter) {
    return parseExpressionFilter("");
  }

  const chatCompletion = await openAIClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: createMessage(filter),
      },
    ],
  });

  const answer = chatCompletion.choices[0]?.message?.content;

  if (answer === "null") {
    return Promise.resolve({
      filters: [],
      errorMessage: "Failed to parse text.",
    });
  }

  return parseExpressionFilter(answer || "");
};

export default parseNLPFilter;
