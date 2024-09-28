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
import SearchFilterParser, { FilterResult } from "../types/SearchFilterParser";

export type StringFilterProps = {
  parser: SearchFilterParser;
  onSearch(filterResult: FilterResult): void;
};

function StringFilter({ parser, onSearch }: StringFilterProps) {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    const result = await parser(value);
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
