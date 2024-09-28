import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Switch,
  FormLabel,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { ColumnStates } from "./useToggleColumns";

type ColumnRevealerProps = {
  columns: {
    key: string;
    label?: string;
  }[];
  columnStates: ColumnStates;
  toggleColumns(column: string[], newState: "visible" | "hidden"): void;
  visibleColumns: string[];
};

function ColumnToggler({
  columns,
  columnStates,
  toggleColumns,
  visibleColumns,
}: ColumnRevealerProps) {
  const handleHideAll = () => {
    toggleColumns(
      columns.slice(1).map((column) => column.key),
      "hidden",
    );
    toggleColumns([columns[0].key], "visible");
  };

  const handleShowAll = () =>
    toggleColumns(
      columns.map((column) => column.key),
      "visible",
    );

  const handleToggleColumn = (column: string) =>
    toggleColumns(
      [column],
      visibleColumns.includes(column) ? "hidden" : "visible",
    );

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          aria-label="Next"
          colorScheme="yellow"
          icon={<HamburgerIcon />}
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent
        borderLeftWidth="2px"
        borderLeftColor="yellow.500"
        borderBottomColor="yellow.500"
      >
        <PopoverBody>
          <Box display="flex" justifyContent="space-between">
            <Button
              colorScheme="yellow"
              onClick={handleHideAll}
              variant="ghost"
              size="md"
            >
              Hide all
            </Button>
            <Button
              colorScheme="yellow"
              onClick={handleShowAll}
              variant="ghost"
              size="md"
            >
              Show all
            </Button>
          </Box>
          <Divider
            orientation="horizontal"
            marginTop="0.4rem"
            marginBottom="1rem"
          />
          {columns.map((column) => {
            return (
              <Box display="flex" gap="1rem" key={column.key}>
                <Switch
                  colorScheme="yellow"
                  disabled={
                    visibleColumns.length === 1 &&
                    visibleColumns.includes(column.key)
                  }
                  id={`isChecked-${column.key}`}
                  isChecked={["visible", "fadeIn"].includes(
                    columnStates[column.key],
                  )}
                  onChange={() => handleToggleColumn(column.key)}
                />
                <FormLabel htmlFor={`isChecked-${column.key}`}>
                  {column.label}
                </FormLabel>
              </Box>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ColumnToggler;
