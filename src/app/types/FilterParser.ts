export type FilterResult = {
  filters: {
    column: string;
    value: string;
    isExact: boolean;
  }[];
  errorMessage?: string;
};

type FilterParser = (filter: string) => Promise<FilterResult>;

export default FilterParser;
