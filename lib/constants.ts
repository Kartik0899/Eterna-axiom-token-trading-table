import { Token, TokenCategory } from "./types";

/**
 * Format time ago string
 */
function formatTimeAgo(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}

/**
 * Generate percentage changes array
 */
function generatePercentageChanges(): number[] {
  return Array.from({ length: 4 }, () => {
    const change = (Math.random() - 0.3) * 200; // Bias towards positive
    return Math.round(change);
  });
}

/**
 * Token data matching the image
 */
const TOKEN_DATA: Record<TokenCategory, Array<Omit<Token, "id" | "category" | "createdAt">>> = {
  "new-pairs": [
    {
      symbol: "MEMECHASE",
      name: "MEMECHASE",
      logo: "🔵",
      price: 0.000895,
      priceChange24h: 58,
      volume24h: 249000,
      liquidity: 0,
      marketCap: 895000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 14,
      transactions: 52,
      rank: 0,
      fees: 0,
      txCount: 14,
      percentageChanges: [58, 62, 39, 7],
      age: "4s",
    },
    {
      symbol: "STEVE",
      name: "First Trench Assistant",
      logo: "🌙",
      price: 0.000972,
      priceChange24h: -76,
      volume24h: 172000,
      liquidity: 0,
      marketCap: 972000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 42,
      transactions: 390,
      rank: 0,
      fees: 3,
      txCount: 34,
      percentageChanges: [-76, -23, 30, 16],
      age: "2s",
    },
    {
      symbol: "VTIFC",
      name: "Venus the Two Faced Cat",
      logo: "🔷",
      price: 0.000402,
      priceChange24h: 72,
      volume24h: 285000,
      liquidity: 0,
      marketCap: 402000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 1,
      transactions: 18,
      rank: 0,
      fees: 4,
      txCount: 0,
      percentageChanges: [72, 2, 7, 0],
      age: "3s",
    },
    {
      symbol: "Tiotlon",
      name: "Tiotlon",
      logo: "🔵",
      price: 0.000302,
      priceChange24h: 42,
      volume24h: 283000,
      liquidity: 0,
      marketCap: 302000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 46,
      transactions: 421,
      rank: 0,
      fees: 0,
      txCount: 36,
      percentageChanges: [42, -72, 52, 12],
      age: "2s",
    },
    {
      symbol: "OKS",
      name: "One Of A Kind Sentences",
      logo: "🌐",
      price: 0.000345,
      priceChange24h: 15,
      volume24h: 110000,
      liquidity: 0,
      marketCap: 345000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 44,
      transactions: 406,
      rank: 0,
      fees: 0,
      txCount: 0,
      percentageChanges: [15, 8, -5, 12],
      age: "5s",
    },
  ],
  "final-stretch": [
    {
      symbol: "VTIFC",
      name: "Venus the Two Faced Cat",
      logo: "🌐",
      price: 0.000790,
      priceChange24h: 79,
      volume24h: 77000,
      liquidity: 0,
      marketCap: 790000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 33,
      transactions: 129,
      rank: 0,
      fees: 0,
      txCount: 51,
      percentageChanges: [79, 91, 94, 25],
      age: "11h 24m",
    },
    {
      symbol: "INNO",
      name: "InnoWeb3",
      logo: "🟢",
      price: 0.000763,
      priceChange24h: 11,
      volume24h: 53000,
      liquidity: 0,
      marketCap: 763000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 37,
      transactions: 47,
      rank: 0,
      fees: 2,
      txCount: 62,
      percentageChanges: [11, 75, 27, 12],
      age: "11h 33m",
    },
    {
      symbol: "NDI69...",
      name: "National Debt Index 6...",
      logo: "🔵",
      price: 0.000960,
      priceChange24h: -85,
      volume24h: 465000,
      liquidity: 0,
      marketCap: 960000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 40,
      transactions: 266,
      rank: 0,
      fees: 5,
      txCount: 84,
      percentageChanges: [-85, -100, 5, 2],
      age: "9h 37m",
    },
    {
      symbol: "BART",
      name: "BART",
      logo: "🟢",
      price: 0.000718,
      priceChange24h: 11,
      volume24h: 270000,
      liquidity: 0,
      marketCap: 718000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 46,
      transactions: 101,
      rank: 0,
      fees: 6,
      txCount: 5,
      percentageChanges: [11, 81, 60, 47],
      age: "11h 2m",
    },
  ],
  "migrated": [
    {
      symbol: "PET",
      name: "cutie pussy cat",
      logo: "🐋",
      price: 0.000125,
      priceChange24h: 46,
      volume24h: 89000,
      liquidity: 0,
      marketCap: 125000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 12,
      transactions: 347,
      rank: 0,
      fees: 8,
      txCount: 0,
      percentageChanges: [46, 39, 10, 48],
      age: "25m",
    },
    {
      symbol: "$SWAL",
      name: "Sorry we are late",
      logo: "🟢",
      price: 0.000234,
      priceChange24h: 40,
      volume24h: 67000,
      liquidity: 0,
      marketCap: 234000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 28,
      transactions: 137,
      rank: 0,
      fees: 0,
      txCount: 0,
      percentageChanges: [40, -41, 11, 10],
      age: "25m",
    },
    {
      symbol: "crashy",
      name: "Crashy the almost gone",
      logo: "🌐",
      price: 0.000089,
      priceChange24h: -99,
      volume24h: 45000,
      liquidity: 0,
      marketCap: 89000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 22,
      transactions: 270,
      rank: 0,
      fees: 3,
      txCount: 0,
      percentageChanges: [-99, -3, 47, 41],
      age: "17m",
    },
    {
      symbol: "IMPEROOTER",
      name: "imperooterxbt",
      logo: "🌐",
      price: 0.000456,
      priceChange24h: 59,
      volume24h: 123000,
      liquidity: 0,
      marketCap: 456000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 20,
      transactions: 422,
      rank: 0,
      fees: 3,
      txCount: 0,
      percentageChanges: [59, 82, 86, 17],
      age: "34m",
    },
    {
      symbol: "BART",
      name: "BART",
      logo: "🔷",
      price: 0.000312,
      priceChange24h: 25,
      volume24h: 78000,
      liquidity: 0,
      marketCap: 312000,
      pairAddress: "0x" + Math.random().toString(16).substring(2, 42),
      holders: 19,
      transactions: 114,
      rank: 0,
      fees: 0,
      txCount: 0,
      percentageChanges: [25, 15, 8, 12],
      age: "24m",
    },
  ],
};

/**
 * Generate dummy token data matching the image
 */
export function generateDummyTokens(category: TokenCategory, count?: number): Token[] {
  const tokens = TOKEN_DATA[category] || [];
  const limit = count || tokens.length;
  
  return tokens.slice(0, limit).map((token, index) => ({
    ...token,
    id: `${category}-${token.symbol}-${index}`,
    category,
    createdAt: Date.now() - (index * 1000), // Stagger creation times
  }));
}

/**
 * Default column states
 */
export const DEFAULT_COLUMN_STATE = {
  activePriority: "P1" as const,
  sortBy: "price" as const,
  sortDirection: "desc" as const,
};
