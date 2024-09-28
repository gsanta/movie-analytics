import { TableProps as ChakraTableProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type TableRowData = Record<
  string,
  {
    label: string | number | React.ReactNode;
    isNumeric?: boolean;
  }
>;

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
