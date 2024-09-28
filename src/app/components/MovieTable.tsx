import { Box, Checkbox, Divider } from "@chakra-ui/react";
import React from "react";
import FilterInput from "./FilterInput";
import useTableData from "../hooks/useTableData";
import Table from "../../lib/Table/Table";

type MovieTableProps = {
  movies: Record<string, string>[];
};

function MovieTable({ movies }: MovieTableProps) {
  const {
    headers,
    parsers,
    rows,
    selectedParser,
    setFilters,
    setSelectedParser,
  } = useTableData(movies);

  return (
    <Table
      defaultVisibleColumns={[
        "Title",
        "Release Year",
        "Locations",
        "Fun Facts",
        "Production Company",
        "Distributor",
        "Director",
        "Writer",
        "SF Find Neighborhoods",
        "Analysis Neighborhoods",
        "Current Supervisor Districts",
      ]}
      expandableColumn="Fun Facts"
      filter={
        <Box alignItems="flex-start" display="flex" gap="0.5rem" width="100%">
          <FilterInput
            onFilter={setFilters}
            parser={parsers[selectedParser]}
            placeholder={
              selectedParser === "expression"
                ? '"Title" =~ "Happyness" AND "Director" = "Steven Conrad"'
                : "List movies where title contains Happyness and the director is Steven Conrad"
            }
          />
          <Checkbox
            colorScheme="yellow"
            isChecked={selectedParser === "nlp"}
            onChange={() =>
              setSelectedParser(
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
      rows={rows}
      style={{ width: "100%", minW: "100rem", maxW: "140rem" }}
    />
  );
}

export default MovieTable;
