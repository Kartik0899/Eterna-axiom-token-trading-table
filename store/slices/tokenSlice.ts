import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, PriceUpdate } from "@/lib/types";

interface TokenState {
  tokens: Record<string, Token>;
}

const initialState: TokenState = {
  tokens: {},
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      action.payload.forEach((token) => {
        state.tokens[token.id] = token;
      });
    },
    updateTokenPrice: (state, action: PayloadAction<PriceUpdate>) => {
      const { tokenId, price, priceChange24h, volume24h, marketCap, percentageChanges } = action.payload;
      if (state.tokens[tokenId]) {
        state.tokens[tokenId].price = price;
        state.tokens[tokenId].priceChange24h = priceChange24h;
        state.tokens[tokenId].volume24h = volume24h;
        state.tokens[tokenId].marketCap = marketCap;
        if (percentageChanges) {
          state.tokens[tokenId].percentageChanges = percentageChanges;
        }
      }
    },
  },
});

export const { setTokens, updateTokenPrice } = tokenSlice.actions;
export default tokenSlice.reducer;

