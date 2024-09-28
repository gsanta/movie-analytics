import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";

export type FilterResult = {
  filters: {
    column: string;
    value: string;
    isExact: boolean;
  }[];
  errorMessage?: string;
};

const parseFilter = (filter: string): FilterResult => {
  const validatorRegex = /^(?:(?:"[^"]*"|\s*(=|=~|AND)\s*)*)$/;

  const filterResults: FilterResult = {
    filters: [],
  };

  if (!validatorRegex.test(filter)) {
    filterResults.errorMessage = "filter is invalid";
  }

  // Regex to match AND that is not within quotes
  const regexAnd = /\sAND\s(?=(?:[^"]*"[^"]*")*[^"]*$)/;

  const regexExact = /"([^"]+)"\s*=\s*"([^"]+)"/;

  filter.split(regexAnd).forEach((part) => {
    const match = part.match(regexExact);

    if (match) {
      const column = match[1];
      const value = match[2];
      filterResults.filters.push({
        column,
        value,
        isExact: true,
      });
    }
  });

  return filterResults;
};

export type StringFilterProps = {
  onSearch(filterResult: FilterResult): void;
};

function StringFilter({ onSearch }: StringFilterProps) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    const result = parseFilter(value);
    onSearch(result);
    setErrorMessage(result.errorMessage || "");
  };

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <InputGroup size="md">
        <Input
          focusBorderColor="yellow.500"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter filter"
          value={value}
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Filter"
            colorScheme="yellow"
            icon={<SearchIcon />}
            onClick={handleSearch}
            size="sm"
            variant="outline"
          />
        </InputRightElement>
      </InputGroup>
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
}

export default StringFilter;
