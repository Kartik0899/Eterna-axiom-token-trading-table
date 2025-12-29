"use client";

import React, { memo, useMemo } from "react";
import { Token, TokenCategory, Priority, SortOption } from "@/lib/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setActivePriority,
  setSortBy,
  setSortDirection,
} from "@/store/slices/appSlice";
import TokenCard from "./TokenCard";
import { Skeleton } from "./ui/skeleton";
import { Shimmer } from "./ui/shimmer";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowUpDown, Zap, Filter, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenColumnProps {
  category: TokenCategory;
  tokens: Token[];
  isLoading?: boolean;
  onTokenClick?: (token: Token) => void;
  hideHeader?: boolean; // Hide header on mobile/tablet when using tabs
}

const COLUMN_TITLES: Record<TokenCategory, string> = {
  "new-pairs": "New Pairs",
  "final-stretch": "Final Stretch",
  migrated: "Migrated",
};

const PRIORITIES: Priority[] = ["P1", "P2", "P3"];
const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Price", value: "price" },
  { label: "Volume", value: "volume" },
  { label: "Liquidity", value: "liquidity" },
  { label: "Change", value: "change" },
  { label: "Market Cap", value: "marketCap" },
];

/**
 * TokenColumn component - Displays a column of tokens with sorting and filtering
 * Features: Priority tabs, sorting, loading states
 */
const TokenColumn = memo(
  ({
    category,
    tokens,
    isLoading,
    onTokenClick,
    hideHeader = false,
  }: TokenColumnProps) => {
    const dispatch = useAppDispatch();
    const columnState = useAppSelector((state) => state.app.columns[category]);
    const storedTokens = useAppSelector((state) => state.tokens.tokens);
    const { activePriority, sortBy, sortDirection } = columnState;

    // Merge stored tokens with fetched tokens (for real-time updates)
    const mergedTokens = useMemo(() => {
      return tokens.map((token) => storedTokens[token.id] || token);
    }, [tokens, storedTokens]);

    const sortedTokens = useMemo(() => {
      if (!mergedTokens.length) return [];

      const sorted = [...mergedTokens].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case "price":
            comparison = a.price - b.price;
            break;
          case "volume":
            comparison = a.volume24h - b.volume24h;
            break;
          case "liquidity":
            comparison = a.liquidity - b.liquidity;
            break;
          case "change":
            comparison = a.priceChange24h - b.priceChange24h;
            break;
          case "marketCap":
            comparison = a.marketCap - b.marketCap;
            break;
          default:
            return 0;
        }

        return sortDirection === "asc" ? comparison : -comparison;
      });

      return sorted;
    }, [mergedTokens, sortBy, sortDirection]);

    const handlePriorityChange = (priority: Priority): void => {
      dispatch(setActivePriority({ category, priority }));
    };

    const handleSort = (option: SortOption): void => {
      if (sortBy === option) {
        dispatch(
          setSortDirection({
            category,
            direction: sortDirection === "asc" ? "desc" : "asc",
          })
        );
      } else {
        dispatch(setSortBy({ category, sortBy: option }));
        dispatch(setSortDirection({ category, direction: "desc" }));
      }
    };

    // Get token count for display
    const tokenCount = sortedTokens.length;

    return (
      <div className="flex flex-col h-full w-full lg:min-w-[300px]">
        {/* Column Header - Bordered container matching image - Hidden on mobile when using tabs */}
        {!hideHeader && (
          <div className="mb-4 border border-border/50 rounded-lg bg-card/30 p-2.5">
            <div className="flex items-center gap-3">
              {/* Left: Title */}
              <h2 className="text-sm font-medium text-foreground whitespace-nowrap">
                {COLUMN_TITLES[category]}
              </h2>

              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center border rounded-full">
                  {/* Count button with lightning bolt and logo */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-l-full rounded-r-none  border-r-2 border-border/50">
                    <Zap className="h-3.5 w-3.5 text-foreground" />
                    <span className="text-xs font-medium text-foreground">
                      {tokenCount}
                    </span>
                    {/* Solana logo - three horizontal bars with gradient */}
                    <div className="flex items-center gap-0.5 ml-4 -rotate-90">
                      <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                      <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                      <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                    </div>
                  </div>

                  {/* Priority Tabs - Rounded button */}
                  <div className="flex items-center gap-0.5 py-1">
                    {PRIORITIES.map((priority) => (
                      <button
                        key={priority}
                        onClick={() => handlePriorityChange(priority)}
                        className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium transition-all",
                          activePriority === priority
                            ? " text-primary"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Filter icon */}
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-muted/50"
                      >
                        <ArrowRightLeft className="h-3.5 w-3.5 text-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {SORT_OPTIONS.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => handleSort(option.value)}
                          className={cn(sortBy === option.value && "bg-accent")}
                        >
                          {option.label}
                          {sortBy === option.value && (
                            <span className="ml-auto text-xs">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Token List */}
        <div
          className="flex-1 space-y-3 overflow-y-auto scrollbar-thin overflow-x-hidden h-[60vh] max-h-[60vh]"
          // style={{
          //   height: `calc(-240px + 100vh)`,
          //   maxHeight: `calc(-240px + 100vh)`,
          // }}
        >
          {isLoading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="relative">
                  <Skeleton className="h-32 w-full" />
                  <Shimmer className="absolute inset-0" />
                </div>
              ))}
            </>
          ) : sortedTokens.length > 0 ? (
            sortedTokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                onTokenClick={onTokenClick}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No tokens available
            </div>
          )}
        </div>
      </div>
    );
  }
);

TokenColumn.displayName = "TokenColumn";

export default TokenColumn;
