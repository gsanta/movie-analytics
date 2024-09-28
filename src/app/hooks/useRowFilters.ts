import { useState } from "react";
import { TableRowData } from "../../lib/Table/TableProps";
import parseExpressionSearchFilter from "../services/parseExpressionSearchFilter";
import parseNLPSearchFilter from "../services/parseNLPSearchFilter";
import { FilterResult } from "../types/SearchFilterParser";

function isValidNumber(str: string) {
  return !Number.isNaN(parseFloat(str));
}

const findColumnKey = (
  columns: { key: string; label: string }[],
  queryColumnName: string,
) => {
  return columns.find(
    (column) => column.label.toLowerCase() === queryColumnName.toLowerCase(),
  )?.key;
};

const useRowFilters = (data: Record<string, string>[]) => {
  const columns = Object.keys(data[0]).map((columnName) => ({
    key: columnName,
    label: columnName,
  }));

  const parsers = {
    expression: parseExpressionSearchFilter,
    nlp: parseNLPSearchFilter,
  };

  const [filters, setFilters] = useState<FilterResult>();
  const [selectedParser, setParser] =
    useState<keyof typeof parsers>("expression");

  const filteredRows = data
    .filter((inputRow) => inputRow[columns[0].key])
    .filter((inputRow) => {
      return (
        !filters ||
        filters?.filters.every((filter) => {
          const columnName = findColumnKey(columns, filter.column);

          if (!columnName) {
            return true;
          }

          return filter.isExact
            ? String(inputRow[columnName]) === filter.value
            : String(inputRow[columnName]).includes(filter.value);
        })
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

  return {
    filteredRows,
    columns,
    selectedParser,
    parsers,
    setParser,
    setFilters,
  };
};

export default useRowFilters;
