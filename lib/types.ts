// Token data structure

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  pairAddress: string;
  createdAt: number;
  category: TokenCategory;
  logo?: string;
  holders: number;
  transactions: number;
  rank: number;
  fees: number;
  txCount: number;
  percentageChanges: number[]; // Array of 4 percentage changes
  age: string; // Formatted age like "4s", "11h 24m", "25m"
}

// Token categories for different columns
export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

// Priority levels for tokens
export type Priority = "P1" | "P2" | "P3";

// Sort options
export type SortOption = "price" | "volume" | "liquidity" | "change" | "marketCap";

// Sort direction
export type SortDirection = "asc" | "desc";

// WebSocket message for price updates
export interface PriceUpdate {
  tokenId: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  percentageChanges: number[];
  timestamp: number;
}

// Column state for each category
export interface ColumnState {
  activePriority: Priority;
  sortBy: SortOption;
  sortDirection: SortDirection;
}

// Application state
export interface AppState {
  columns: Record<TokenCategory, ColumnState>;
  selectedToken: Token | null;
  isConnected: boolean;
}

