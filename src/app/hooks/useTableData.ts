import { useMemo, useState } from "react";
import { TableRowData } from "../../lib/Table/TableProps";
import parseExpressionFilter from "../services/parseExpressionFilter";
import parseNLPFilter from "../services/parseNLPFilter";
import { FilterResult } from "../types/FilterParser";

type InputRow = {
  key: string;
  columns: Record<string, string>;
};

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

const filterByColumns = (
  { columns }: InputRow,
  filters: FilterResult | undefined,
  headers: {
    key: string;
    label: string;
  }[],
) => {
  return (
    !filters ||
    filters?.filters.every((filter) => {
      const columnName = findColumnKey(headers, filter.column);

      if (!columnName) {
        return true;
      }

      return filter.isExact
        ? String(columns[columnName]) === filter.value
        : String(columns[columnName]).includes(filter.value);
    })
  );
};

const createTableRows = ({ key: rowKey, columns }: InputRow) => {
  const row: TableRowData = {
    key: rowKey,
    columns: {},
  };

  Object.entries(columns).forEach(([columnKey, val]) => {
    row.columns[columnKey] = {
      isNumeric: isValidNumber(val),
      label: val,
    };
  });

  return row;
};

const useTableData = (data: Record<string, string>[]) => {
  const inputRows: InputRow[] = useMemo(
    () =>
      data.map((input, index) => ({
        key: `key-${index}`,
        columns: input,
      })),
    [data],
  );

  const headers = Object.keys(data[0]).map((columnName) => ({
    key: columnName,
    label: columnName,
  }));

  const parsers = {
    expression: parseExpressionFilter,
    nlp: parseNLPFilter,
  };

  const [filters, setFilters] = useState<FilterResult>();
  const [selectedParser, setSelectedParser] =
    useState<keyof typeof parsers>("expression");

  const rows = useMemo(
    () =>
      inputRows
        .filter((inputRow) => inputRow.columns[headers[0].key])
        .filter((inputRow) => filterByColumns(inputRow, filters, headers))
        .map((inputRow) => createTableRows(inputRow)),
    [filters, headers, inputRows],
  );

  return {
    headers,
    parsers,
    rows,
    selectedParser,
    setSelectedParser,
    setFilters,
  };
};

export default useTableData;
