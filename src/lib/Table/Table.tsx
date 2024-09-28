import React, { useEffect, useMemo, useState } from "react";
import { Box, Card, useMultiStyleConfig } from "@chakra-ui/react";
import TablePagination from "./TablePagination";
import TableProps from "./TableProps";
import TableRow from "./TableRow";
import ColumnToggler from "./ColumnToggler";
import useToggleColumns from "./useToggleColumns";

function Headers({
  expandableColumn,
  realHeaders,
}: {
  expandableColumn?: string;
  realHeaders: {
    key: string;
    label?: string;
  }[];
}) {
  const styles = useMultiStyleConfig("DataTable");

  return (
    <tr>
      {expandableColumn && <Box as="th" __css={styles.th} width="4rem" />}
      {realHeaders.map((column) => (
        <Box as="th" __css={styles.th} key={column.key}>
          {column.label}
        </Box>
      ))}
    </tr>
  );
}

function EmptyState({ colSpan }: { colSpan: number }) {
  return (
    <Box as="tr">
      <Box as="td" colSpan={colSpan}>
        <Card
          bgColor="gray.200"
          fontWeight="bold"
          margin="0.5rem"
          padding="1rem"
          textAlign="center"
        >
          The table is empty.
        </Card>
      </Box>
    </Box>
  );
}

function Table({
  defaultVisibleColumns,
  expandableColumn,
  filter,
  headers,
  rows,
  style = {},
}: TableProps) {
  const styles = useMultiStyleConfig("DataTable");

  const itemsPerPage = 20;
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [rows]);

  const { columnStates, toggleColumns, visibleColumns } = useToggleColumns(
    headers,
    defaultVisibleColumns,
  );

  const realHeaders = headers.filter(
    (header) =>
      header.key !== expandableColumn && visibleColumns.includes(header.key),
  );

  const pageRows = useMemo(
    () => rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage),
    [page, rows],
  );

  return (
    <Box display="flex" flexDir="column" gap="1rem">
      <Box
        alignItems="flex-start"
        display="flex"
        flexDir="row-reverse"
        gap="1rem"
      >
        <Box paddingTop="0.2rem">
          <ColumnToggler
            columns={headers.filter(
              (header) => header.key !== expandableColumn,
            )}
            columnStates={columnStates}
            toggleColumns={toggleColumns}
            visibleColumns={visibleColumns.filter(
              (column) => column !== expandableColumn,
            )}
          />
        </Box>
        {filter}
      </Box>
      <Box overflowX="auto">
        <Box as="table" __css={styles.table} {...style}>
          <Box as="thead" __css={styles.thead}>
            <Headers
              expandableColumn={expandableColumn}
              realHeaders={realHeaders}
            />
          </Box>
          <tbody>
            {rows.length === 0 && (
              <EmptyState colSpan={realHeaders.length + 1} />
            )}
            {pageRows.map((row) => (
              <TableRow
                columnStates={columnStates}
                expandableColumn={expandableColumn}
                key={row.key}
                row={row}
                visibleHeaders={realHeaders}
              />
            ))}
            <TablePagination
              colsPan={realHeaders.length + 1}
              itemCount={rows.length}
              itemsPerPage={itemsPerPage}
              page={page}
              setPage={setPage}
            />
          </tbody>
        </Box>
      </Box>
    </Box>
  );
}

export default Table;
