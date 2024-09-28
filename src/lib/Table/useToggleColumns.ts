import { useCallback, useMemo, useReducer } from "react";

export type ColumnState = "visible" | "fadeOut" | "fadeIn" | "hidden";

export type ColumnStates = Record<string, ColumnState>;

function columnStatesReducer(
  state: Record<string, ColumnState>,
  action: { column: string; newState: ColumnState }[],
) {
  const newState = { ...state };
  action.forEach((item) => {
    newState[item.column] = item.newState;
  });

  return newState;
}

const useToggleColumns = (
  headers: {
    key: string;
    label?: string;
  }[],
  defaultVisibleColumns: string[],
) => {
  const initialColumnStates = headers.reduce<Record<string, ColumnState>>(
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

  const [columnStates, dispatchColumnState] = useReducer(
    columnStatesReducer,
    initialColumnStates,
  );

  const visibleColumns = useMemo(() => {
    return headers
      .filter((column) => columnStates[column.key] !== "hidden")
      .map((column) => column.key);
  }, [columnStates, headers]);

  const toggleColumns = useCallback(
    (toggledColumns: string[], newState: "visible" | "hidden") => {
      const fadingStates: Parameters<typeof columnStatesReducer>[1] = [];
      const finalStates: Parameters<typeof columnStatesReducer>[1] = [];

      toggledColumns.forEach((column) => {
        if (["visible", "hidden"].includes(columnStates[column])) {
          fadingStates.push({
            column,
            newState: newState === "visible" ? "fadeIn" : "fadeOut",
          });
          finalStates.push({
            column,
            newState,
          });
        }
      });

      dispatchColumnState(fadingStates);
      setTimeout(() => dispatchColumnState(finalStates), 500);
    },
    [columnStates],
  );

  return {
    columnStates,
    visibleColumns,
    toggleColumns,
  };
};

export default useToggleColumns;
