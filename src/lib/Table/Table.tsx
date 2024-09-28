import React, { useMemo, useState } from "react";
import { Box, useMultiStyleConfig } from "@chakra-ui/react";
import TablePagination from "./TablePagination";
import TableProps from "./TableProps";
import TableRow from "./TableRow";
import ColumnRevealer from "./ColumnRevealer";

function Table({
  defaultVisibleColumns,
  expandableColumn,
  headers,
  rows,
  style = {},
}: TableProps) {
  const styles = useMultiStyleConfig("DataTable");

  const itemsPerPage = 20;
  const [page, setPage] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns);

  const visibleHeaders = headers.filter(
    (header) =>
      header.key !== expandableColumn && visibleColumns.includes(header.key),
  );

  const visibleRows = useMemo(
    () => rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage),
    [page, rows],
  );

  return (
    <>
      <Box alignSelf="flex-end">
        <ColumnRevealer
          columns={headers}
          setVisibleColumns={setVisibleColumns}
          visibleColumns={visibleColumns}
        />
      </Box>
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
            {expandableColumn && <Box as="th" __css={styles.th} width="4rem" />}
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
    </>
  );
}

export default Table;
