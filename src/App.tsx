import React, { useState } from "react";
import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import dataset from "../dataset.csv";
import Table from "./lib/Table/Table";
import theme from "./lib/theme";
import TableProps, { TableRowData } from "./lib/Table/TableProps";
import StringFilter, { FilterResult } from "./app/StringFilter";

function isValidNumber(str: string) {
  return !Number.isNaN(parseFloat(str));
}

function App() {
  const data = dataset as Record<string, string>[];
  const headers: TableProps["headers"] = Object.keys(data[0]).map(
    (columnName) => ({
      key: columnName,
      label: columnName,
    }),
  );

  const [filters, setFilters] = useState<FilterResult>();

  const rows = data
    .filter((inputRow) => {
      return (
        !filters ||
        filters?.filters.every(
          (filter) => String(inputRow[filter.column]) === filter.value,
        )
      );
    })
    .map((inputRow) => {
      const row: TableRowData = {};

      Object.entries(inputRow).forEach(([key, val]) => {
        row[key] = {
          label: val,
          isNumeric: isValidNumber(val),
        };
      });

      return row;
    });

  return (
    <ChakraBaseProvider theme={theme}>
      <Box
        alignItems="center"
        display="flex"
        flexDir="column"
        gap="1rem"
        style={{ padding: "20px", height: "500px" }}
      >
        <Box display="flex" flexDir="column" gap="1rem">
          <Table
            defaultVisibleColumns={headers.map((header) => header.key)}
            expandableColumn="Fun Facts"
            filter={<StringFilter onSearch={setFilters} />}
            headers={headers}
            rows={rows}
            style={{ width: "120rem" }}
          />
        </Box>
      </Box>
    </ChakraBaseProvider>
  );
}

export default App;
