import { TriangleDownIcon } from "@chakra-ui/icons";
import { useMultiStyleConfig, Box, IconButton, Card } from "@chakra-ui/react";
import React, { useState } from "react";
import TableProps, { TableRowData } from "./TableProps";

type TableRowProps = {
  expandableColumn?: string;
  fields: TableRowData;
  visibleHeaders: TableProps["headers"];
};

function TableRow({ expandableColumn, visibleHeaders, fields }: TableRowProps) {
  const [isExpended, setIsExpanded] = useState(false);
  const styles = useMultiStyleConfig("DataTable");
  const hasExpandableContent =
    expandableColumn && fields[expandableColumn]?.label;

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
            textAlign={fields[headerKey].isNumeric ? "right" : "left"}
          >
            {fields[headerKey].label}
          </Box>
        ))}
      </Box>
      {hasExpandableContent && isExpended && (
        <Box as="tr">
          <Box
            as="td"
            colSpan={visibleHeaders.length + 1}
            __css={styles.expandableTd}
          >
            <Card padding="1rem" variant="filled">
              {fields[expandableColumn].label}
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
}

export default TableRow;
