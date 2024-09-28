export type FilterResult = {
  filters: {
    column: string;
    value: string;
    isExact: boolean;
  }[];
  errorMessage?: string;
};

type SearchFilterParser = (filter: string) => Promise<FilterResult>;

export default SearchFilterParser;
