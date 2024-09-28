import { extendTheme } from "@chakra-ui/react";
import Table from "./Table/Table.theme";

const theme = extendTheme({
  components: {
    DataTable: Table,
  },
});

export default theme;
