import React, { useMemo, useState } from "react";
import { Box, useMultiStyleConfig } from "@chakra-ui/react";
import TablePagination from "./TablePagination";
import TableProps from "./TableProps";
import TableRow from "./TableRow";
import ColumnToggler from "./ColumnToggler";
import useToggleColumns from "./useToggleColumns";

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

  const visibleRows = useMemo(
    () => rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage),
    [page, rows],
  );

  const { columnStates, toggleColumn, visibleColumns } = useToggleColumns(
    headers,
    defaultVisibleColumns,
  );

  const visibleHeaders = headers.filter(
    (header) =>
      header.key !== expandableColumn && visibleColumns.includes(header.key),
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
            columns={headers}
            columnStates={columnStates}
            toggleColumn={toggleColumn}
            visibleColumns={visibleColumns}
          />
        </Box>
        {filter}
      </Box>
      <Box overflowX="auto">
        <Box
          as="table"
          style={{
            borderCollapse: "collapse",
            borderSpacing: "0",
            display: "table",
            tableLayout: "fixed",
          }}
          __css={styles.table}
          {...style}
        >
          <Box as="thead" __css={styles.thead}>
            <tr>
              {expandableColumn && (
                <Box as="th" __css={styles.th} width="4rem" />
              )}
              {visibleHeaders.map((column) => (
                <Box as="th" __css={styles.th}>
                  {column.label}
                </Box>
              ))}
            </tr>
          </Box>
          <tbody>
            {visibleRows.map((fields) => (
              <TableRow
                expandableColumn={expandableColumn}
                fields={fields}
                columnStates={columnStates}
                visibleHeaders={visibleHeaders}
              />
            ))}
            <TablePagination
              colsPan={visibleHeaders.length + 1}
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
