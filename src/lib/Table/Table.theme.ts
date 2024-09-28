import { createMultiStyleConfigHelpers, keyframes } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers([
  "expandableTd",
  "table",
  "td",
  "th",
  "thead",
  "tr",
]);

const fade = keyframes`
  0% {
    background-color: rgba(214, 158, 46, 1);
  }
  100% {
    background-color: rgba(214, 158, 46, 0);
  }
`;

const Table = helpers.defineMultiStyleConfig({
  baseStyle: {
    table: {
      borderCollapse: "collapse",
      borderSpacing: "0",
      display: "table",
      tableLayout: "fixed",
    },
    th: {
      bgColor: "yellow.500",
      _first: {
        borderTopLeftRadius: "0.5rem",
      },
      _last: {
        borderTopRightRadius: "0.5rem",
      },
      padding: "0.5rem",
      position: "sticky",
      top: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textTransform: "uppercase",
    },
    thead: {
      borderRadius: "0.5rem",
    },
    td: {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: "gray.200",
      borderBottom: 0,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100px",
      padding: "0.5rem",
      _first: {
        borderLeft: "1px",
        borderLeftColor: "gray.200",
      },
      _last: {
        borderRight: "1px",
        borderRightColor: "gray.200",
      },
      "&.fade": {
        animation: `${fade} 0.8s`,
      },
    },
    expandableTd: {
      borderLeft: "1px",
      borderLeftColor: "gray.200",
      borderRight: "1px",
      borderRightColor: "gray.200",
      padding: "0.5rem",
    },
    tr: {
      _last: {
        td: {
          borderBottomWidth: "3px",
          borderBottomColor: "yellow.500",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: "gray.200",
        },
      },
    },
  },
});

export default Table;
