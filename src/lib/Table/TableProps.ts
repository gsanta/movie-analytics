import { TableProps as ChakraTableProps } from "@chakra-ui/react";

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
  expandableColumn?: string;
  rows: TableRowData[];
  style?: TableStyleProps;
};

export default TableProps;
