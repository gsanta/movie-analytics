import { TableProps as ChakraTableProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type TableRowData = {
  columns: Record<
    string,
    {
      isNumeric?: boolean;
      label: string | number | React.ReactNode;
    }
  >;
  key: string;
};

type TableStyleProps = ChakraTableProps;

type TableProps = {
  headers: {
    key: string;
    label?: string;
  }[];
  defaultVisibleColumns: string[];
  expandableColumn?: string;
  filter?: ReactNode;
  rows: TableRowData[];
  style?: TableStyleProps;
};

export default TableProps;
