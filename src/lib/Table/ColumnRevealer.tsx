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

type ColumnRevealerProps = {
  columns: {
    key: string;
    label?: string;
  }[];
  setVisibleColumns(columns: string[]): void;
  visibleColumns: string[];
};

function ColumnRevealer({
  columns,
  setVisibleColumns,
  visibleColumns,
}: ColumnRevealerProps) {
  const handleToggleColumn = (newColumn: string) => {
    setVisibleColumns(
      visibleColumns.includes(newColumn)
        ? visibleColumns.filter((column) => newColumn !== column)
        : [...visibleColumns, newColumn],
    );
  };

  const handleHideAll = () => setVisibleColumns([columns[0].key]);

  const handleShowAll = () =>
    setVisibleColumns(columns.map((column) => column.key));

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
      <PopoverContent>
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
                  isChecked={visibleColumns.includes(column.key)}
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

export default ColumnRevealer;
