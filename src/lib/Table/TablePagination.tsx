import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton, useMultiStyleConfig } from "@chakra-ui/react";
import React from "react";

type TablePaginationProps = {
  colsPan: number;
  itemsPerPage: number;
  itemCount: number;
  page: number;
  setPage(newPage: number): void;
};

function TablePagination({
  colsPan,
  itemsPerPage,
  itemCount,
  page,
  setPage,
}: TablePaginationProps) {
  const lastPage = Math.ceil(itemCount / itemsPerPage) - 1;

  const styles = useMultiStyleConfig("DataTable");

  return (
    <Box as="tr" __css={styles.tr}>
      <Box as="td" colSpan={colsPan} __css={styles.expandableTd}>
        <Box
          alignItems="center"
          display="flex"
          gap="1rem"
          justifyContent="flex-end"
        >
          {page * itemsPerPage}-{page * itemsPerPage + itemsPerPage} of{" "}
          {itemCount}
          <IconButton
            aria-label="Previous"
            colorScheme="yellow"
            icon={<ChevronLeftIcon />}
            isDisabled={page === 0}
            onClick={() => setPage(page - 1)}
            size="sm"
            variant="outline"
          />
          <IconButton
            aria-label="Next"
            colorScheme="yellow"
            icon={<ChevronRightIcon />}
            isDisabled={page === lastPage}
            onClick={() => setPage(page + 1)}
            size="sm"
            variant="outline"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TablePagination;
