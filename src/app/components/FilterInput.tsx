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
import FilterParser, { FilterResult } from "../types/FilterParser";

export type FilterInputProps = {
  parser: FilterParser;
  onFilter(filterResult: FilterResult): void;
  placeholder: string;
};

function FilterInput({ parser, onFilter, placeholder }: FilterInputProps) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const result = await parser(value);
    onFilter(result);
    setErrorMessage(result.errorMessage || "");
    setIsLoading(false);
  };

  return (
    <FormControl isInvalid={Boolean(errorMessage)}>
      <InputGroup size="md">
        <Input
          focusBorderColor="yellow.500"
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          value={value}
        />
        <InputRightElement width="3rem">
          <IconButton
            aria-label="Filter"
            colorScheme="yellow"
            icon={<SearchIcon />}
            isLoading={isLoading}
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

export default FilterInput;
