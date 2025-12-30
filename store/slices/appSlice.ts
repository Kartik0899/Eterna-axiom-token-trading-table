import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenCategory, Priority, SortOption, SortDirection, ColumnState } from "@/lib/types";
import { DEFAULT_COLUMN_STATE } from "@/lib/constants";

interface AppState {
  columns: Record<TokenCategory, ColumnState>;
  selectedToken: Token | null;
  isConnected: boolean;
  searchQuery: string;
}

const initialState: AppState = {
  columns: {
    "new-pairs": DEFAULT_COLUMN_STATE,
    "final-stretch": DEFAULT_COLUMN_STATE,
    "migrated": DEFAULT_COLUMN_STATE,
  },
  selectedToken: null,
  isConnected: false,
  searchQuery: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActivePriority: (
      state,
      action: PayloadAction<{ category: TokenCategory; priority: Priority }>
    ) => {
      state.columns[action.payload.category].activePriority = action.payload.priority;
    },
    setSortBy: (
      state,
      action: PayloadAction<{ category: TokenCategory; sortBy: SortOption }>
    ) => {
      state.columns[action.payload.category].sortBy = action.payload.sortBy;
    },
    setSortDirection: (
      state,
      action: PayloadAction<{ category: TokenCategory; direction: SortDirection }>
    ) => {
      state.columns[action.payload.category].sortDirection = action.payload.direction;
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setActivePriority,
  setSortBy,
  setSortDirection,
  setSelectedToken,
  setConnectionStatus,
  setSearchQuery,
} = appSlice.actions;

export default appSlice.reducer;

