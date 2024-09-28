import { TriangleDownIcon } from "@chakra-ui/icons";
import { useMultiStyleConfig, Box, IconButton, Card } from "@chakra-ui/react";
import React, { useState } from "react";
import TableProps, { TableRowData } from "./TableProps";
import { ColumnStates } from "./useToggleColumns";

type TableRowProps = {
  columnStates: ColumnStates;
  expandableColumn?: string;
  row: TableRowData;
  visibleHeaders: TableProps["headers"];
};

function TableRow({
  columnStates,
  expandableColumn,
  visibleHeaders,
  row,
}: TableRowProps) {
  const [isExpended, setIsExpanded] = useState(false);
  const styles = useMultiStyleConfig("DataTable");
  const { columns } = row;
  const hasExpandableContent =
    expandableColumn && columns[expandableColumn]?.label;

  return (
    <>
      <Box as="tr">
        <Box as="td" __css={styles.td} paddingTop="0" paddingBottom="0">
          {hasExpandableContent && (
            <IconButton
              aria-label="Expand"
              colorScheme="yellow"
              icon={
                <TriangleDownIcon
                  transform={isExpended ? "rotate(-180deg)" : "rotate(0deg)"}
                  transition="300ms"
                />
              }
              onClick={() => setIsExpanded(!isExpended)}
              size="sm"
              variant="ghost"
            />
          )}
        </Box>
        {visibleHeaders.map(({ key: headerKey }) => (
          <Box
            as="td"
            key={headerKey}
            __css={styles.td}
            className={
              ["fadeIn", "fadeOut"].includes(columnStates[headerKey])
                ? "fade"
                : ""
            }
            textAlign={columns[headerKey].isNumeric ? "right" : "left"}
          >
            {columns[headerKey].label}
          </Box>
        ))}
      </Box>
      {hasExpandableContent && isExpended && (
        <Box as="tr" key={`${row.key}-expandable`}>
          <Box
            as="td"
            colSpan={visibleHeaders.length + 1}
            __css={styles.expandableTd}
          >
            <Card padding="1rem" variant="filled">
              {columns[expandableColumn].label}
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
}

export default TableRow;
