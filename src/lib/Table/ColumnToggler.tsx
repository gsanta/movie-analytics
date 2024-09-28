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
  toggleColumn(column: string): void;
  visibleColumns: string[];
};

function ColumnToggler({
  columns,
  columnStates,
  toggleColumn,
  visibleColumns,
}: ColumnRevealerProps) {
  const handleHideAll = () => toggleColumn([columns[0].key][0]);

  const handleShowAll = () =>
    toggleColumn(columns.map((column) => column.key)[0]);

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
              <Box display="flex" gap="1rem">
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
                  onChange={() => toggleColumn(column.key)}
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
