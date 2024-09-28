import React from "react";
import { Box, ChakraBaseProvider, Checkbox, Divider } from "@chakra-ui/react";
import dataset from "../dataset.csv";
import Table from "./lib/Table/Table";
import theme from "./lib/theme";
import StringFilter from "./app/components/StringFilter";
import useRowFilters from "./app/hooks/useRowFilters";

function App() {
  const data = dataset as Record<string, string>[];

  const {
    filteredRows,
    columns: headers,
    selectedParser,
    parsers,
    setParser,
    setFilters,
  } = useRowFilters(data);

  return (
    <ChakraBaseProvider theme={theme}>
      <Box
        alignItems="center"
        display="flex"
        flexDir="column"
        gap="1rem"
        style={{ padding: "20px" }}
      >
        <Box maxW="100%">
          <Table
            defaultVisibleColumns={headers.map((header) => header.key)}
            expandableColumn="Fun Facts"
            filter={
              <Box
                alignItems="flex-start"
                display="flex"
                gap="0.5rem"
                width="100%"
              >
                <StringFilter
                  onSearch={setFilters}
                  parser={parsers[selectedParser]}
                />
                <Checkbox
                  colorScheme="yellow"
                  isChecked={selectedParser === "nlp"}
                  onChange={() =>
                    setParser(
                      selectedParser === "expression" ? "nlp" : "expression",
                    )
                  }
                  defaultChecked
                  paddingTop="0.5rem"
                  whiteSpace="nowrap"
                >
                  Use NLP
                </Checkbox>
                <Divider
                  color="gray.200"
                  orientation="vertical"
                  height="2.5rem"
                  borderWidth="1px"
                />
              </Box>
            }
            headers={headers}
            rows={filteredRows}
            style={{ width: "120rem" }}
          />
        </Box>
      </Box>
    </ChakraBaseProvider>
  );
}

export default App;
