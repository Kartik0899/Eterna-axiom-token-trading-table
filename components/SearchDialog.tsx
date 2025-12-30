"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Token } from "@/lib/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSearchQuery, setSelectedToken } from "@/store/slices/appSlice";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { formatPercentage } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTokenClick?: (token: Token) => void;
}

export function SearchDialog({
  open,
  onOpenChange,
  onTokenClick,
}: SearchDialogProps) {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.app.searchQuery);
  const allTokens = useAppSelector((state) => state.tokens.tokens);
  const [localQuery, setLocalQuery] = useState("");

  // Filter tokens based on search query
  const filteredTokens = useMemo(() => {
    if (!localQuery.trim()) return [];

    const query = localQuery.toLowerCase().trim();
    return Object.values(allTokens).filter((token) => {
      return (
        token.symbol.toLowerCase().includes(query) ||
        token.name.toLowerCase().includes(query) ||
        token.pairAddress.toLowerCase().includes(query) ||
        token.category.toLowerCase().includes(query)
      );
    });
  }, [allTokens, localQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalQuery(value);
      dispatch(setSearchQuery(value));
    },
    [dispatch]
  );

  const handleTokenClick = useCallback(
    (token: Token) => {
      dispatch(setSelectedToken(token));
      if (onTokenClick) {
        onTokenClick(token);
      }
    },
    [dispatch, onTokenClick]
  );

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setLocalQuery("");
    dispatch(setSearchQuery(""));
  }, [onOpenChange, dispatch]);

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={true}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col z-[55]">
        <DialogHeader>
          <DialogTitle>Search Tokens</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by symbol, name, or address..."
            value={localQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-10 h-10"
            autoFocus
          />
          {localQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => {
                setLocalQuery("");
                dispatch(setSearchQuery(""));
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto mt-4 space-y-2 scrollbar-thin">
          {localQuery.trim() && filteredTokens.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tokens found matching &quot;{localQuery}&quot;</p>
            </div>
          ) : filteredTokens.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">
                {filteredTokens.length} result
                {filteredTokens.length !== 1 ? "s" : ""} found
              </p>
              {filteredTokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handleTokenClick(token)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border border-border/50 bg-card",
                    "hover:border-primary/50 hover:bg-accent transition-colors"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-lg border-2 border-blue-500/60 bg-white/5 flex items-center justify-center flex-shrink-0">
                        <div className="text-lg">{token.logo || "🪙"}</div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-foreground">
                            {token.symbol}
                          </h3>
                          <span className="text-xs text-muted-foreground truncate">
                            {token.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate font-mono">
                          {token.pairAddress.slice(0, 8)}...
                          {token.pairAddress.slice(-6)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {token.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium text-foreground">
                        ${token.price.toFixed(6)}
                      </div>
                      <div
                        className={cn(
                          "text-xs",
                          token.priceChange24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        )}
                      >
                        {formatPercentage(token.priceChange24h)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search for tokens</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
