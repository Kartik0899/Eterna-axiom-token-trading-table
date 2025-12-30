"use client";

import React, { memo } from "react";
import { Token } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TokenModalProps {
  token: Token | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TokenModal = memo(({ token, open, onOpenChange }: TokenModalProps) => {
  if (!token) return null;

  const isPositive = token.priceChange24h >= 0;
  const priceChangeClass = isPositive ? "text-green-500" : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="max-w-2xl z-60">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {token.name} ({token.symbol})
          </DialogTitle>
          <DialogDescription>
            Detailed token information and statistics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Price Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Price Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Current Price
                </p>
                <p className="text-2xl font-bold">
                  ${formatCurrency(token.price)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">24h Change</p>
                <div
                  className={cn(
                    "flex items-center gap-2 text-xl font-semibold",
                    priceChangeClass
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  {formatPercentage(token.priceChange24h)}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
                <p className="text-lg font-medium">
                  ${formatCurrency(token.volume24h, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Liquidity</p>
                <p className="text-lg font-medium">
                  ${formatCurrency(token.liquidity, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                <p className="text-lg font-medium">
                  ${formatCurrency(token.marketCap, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Category</p>
                <p className="text-lg font-medium capitalize">
                  {token.category.replace("-", " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Pair Address */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-lg font-semibold">Pair Address</h3>
            <p className="text-sm font-mono text-muted-foreground break-all bg-muted p-3 rounded">
              {token.pairAddress}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

TokenModal.displayName = "TokenModal";

export default TokenModal;
