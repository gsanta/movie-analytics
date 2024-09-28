import React, { useMemo, useState } from "react";
import { Box, useMultiStyleConfig } from "@chakra-ui/react";
import TablePagination from "./TablePagination";
import TableProps from "./TableProps";
import TableRow from "./TableRow";

function Table({ expandableColumn, headers, rows, style = {} }: TableProps) {
  const styles = useMultiStyleConfig("DataTable");

  const visibleColumns = headers.filter(
    (header) => header.key !== expandableColumn,
  );

  const itemsPerPage = 20;
  const [page, setPage] = useState(0);

  const visibleRows = useMemo(
    () => rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage),
    [page, rows],
  );

  return (
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
          {visibleColumns.map((column) => (
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
            visibleColumns={visibleColumns}
          />
        ))}
        <TablePagination
          colsPan={visibleColumns.length + 1}
          itemCount={rows.length}
          itemsPerPage={itemsPerPage}
          page={page}
          setPage={setPage}
        />
      </tbody>
    </Box>
  );
}

export default Table;
