import React from "react";
import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import dataset from "../dataset.csv";
import Table from "./lib/Table/Table";
import theme from "./lib/theme";
import TableProps, { TableRowData } from "./lib/Table/TableProps";

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

  const rows = data.map((inputRow) => {
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
        style={{ padding: "20px", height: "500px" }}
      >
        <Table
          expandableColumn="Fun Facts"
          headers={headers}
          rows={rows}
          style={{ width: "120rem" }}
        />
      </Box>
    </ChakraBaseProvider>
  );
}

export default App;
