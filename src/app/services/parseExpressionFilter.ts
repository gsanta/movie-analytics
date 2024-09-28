import FilterParser, { FilterResult } from "../types/FilterParser";

const validatorRegex = /^(?:(?:"[^"]*"|\s*(=|=~|AND)\s*)*)$/;
// Regex to match AND that is not within quotes
const andRegex = /\sAND\s(?=(?:[^"]*"[^"]*")*[^"]*$)/;
const exactMatchRegex = /"([^"]+)"\s*=\s*"([^"]+)"/;
const partialMatchRegex = /"([^"]+)"\s*=~\s*"([^"]+)"/;

const getMatchResult = (match: RegExpMatchArray, isExact: boolean) => {
  const column = match[1];
  const value = match[2];

  return {
    column,
    value,
    isExact,
  };
};

const parseKeyValuePairs = (part: string) => {
  const exactMatch = part.match(exactMatchRegex);

  if (exactMatch) {
    return getMatchResult(exactMatch, true);
  }

  const partialMatch = part.match(partialMatchRegex);

  if (partialMatch) {
    return getMatchResult(partialMatch, false);
  }

  throw new Error("parse failed");
};

const parseExpressionFilter: FilterParser = (
  filter: string,
): Promise<FilterResult> => {
  const filterResults: FilterResult = {
    filters: [],
  };

  if (!validatorRegex.test(filter)) {
    filterResults.errorMessage = "Filter is invalid.";
  }

  try {
    filterResults.filters = filter
      ? filter.split(andRegex).map(parseKeyValuePairs)
      : [];
  } catch {
    filterResults.errorMessage = "Filter is invalid.";
  }

  return Promise.resolve(filterResults);
};

export default parseExpressionFilter;
