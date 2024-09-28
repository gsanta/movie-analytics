import { useCallback, useMemo, useReducer } from "react";

export type ColumnState = "visible" | "fadeOut" | "fadeIn" | "hidden";

export type ColumnStates = Record<string, ColumnState>;

function reducer(
  state: Record<string, ColumnState>,
  action: { column: string; newState: ColumnState },
) {
  const newState = { ...state };
  newState[action.column] = action.newState;

  return newState;
}

const useToggleColumns = (
  columns: {
    key: string;
    label?: string;
  }[],
  defaultVisibleColumns: string[],
) => {
  const initialState = columns.reduce<Record<string, ColumnState>>(
    (state, nextColumn) => {
      return {
        ...state,
        [nextColumn.key]: defaultVisibleColumns.includes(nextColumn.key)
          ? "visible"
          : "hidden",
      };
    },
    {},
  );

  const [columnStates, dispatchColumnState] = useReducer(reducer, initialState);

  const visibleColumns = useMemo(() => {
    return columns
      .filter((column) => columnStates[column.key] !== "hidden")
      .map((column) => column.key);
  }, [columnStates, columns]);

  const toggleColumn = useCallback(
    (column: string) => {
      if (["visible", "hidden"].includes(columnStates[column])) {
        if (columnStates[column] === "visible") {
          dispatchColumnState({
            column,
            newState: "fadeOut",
          });
          setTimeout(() => {
            dispatchColumnState({
              column,
              newState: "hidden",
            });
          }, 500);
        } else {
          dispatchColumnState({
            column,
            newState: "fadeIn",
          });
          setTimeout(() => {
            dispatchColumnState({
              column,
              newState: "visible",
            });
          }, 500);
        }
      }
    },
    [columnStates],
  );

  return {
    columnStates,
    visibleColumns,
    toggleColumn,
  };
};

export default useToggleColumns;
