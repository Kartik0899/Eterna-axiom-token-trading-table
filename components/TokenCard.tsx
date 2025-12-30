"use client";

import React, { memo, useState, useEffect } from "react";
import { Token } from "@/lib/types";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { TooltipProvider } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Users,
  Globe,
  Crown,
  Search,
  Copy,
  TrendingUp,
  UtensilsCrossed,
  Crosshair,
  User,
  Check,
} from "lucide-react";

interface TokenCardProps {
  token: Token;
  onTokenClick?: (token: Token) => void;
}

// Truncate address to show first few and last few characters
function truncateAddress(
  address: string,
  start: number = 5,
  end: number = 4
): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

const TokenCard = memo(({ token, onTokenClick }: TokenCardProps) => {
  const storedTokens = useAppSelector((state) => state.tokens.tokens);
  const currentToken = storedTokens[token.id] || token;

  const [priceColor, setPriceColor] = useState<string>("");
  const [prevPrice, setPrevPrice] = useState<number>(currentToken.price);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (currentToken.price > prevPrice) {
      setPriceColor("text-green-500");
      setTimeout(() => setPriceColor(""), 1000);
    } else if (currentToken.price < prevPrice) {
      setPriceColor("text-red-500");
      setTimeout(() => setPriceColor(""), 1000);
    }
    setPrevPrice(currentToken.price);
  }, [currentToken.price, prevPrice]);

  // Get category prefix for address truncation
  const categoryPrefix =
    currentToken.category === "new-pairs"
      ? "newPai"
      : currentToken.category === "final-stretch"
      ? "finalS"
      : "migrat";
  const truncatedAddress = truncateAddress(currentToken.pairAddress, 5, 4);

  // Icons for percentage boxes
  const percentageIcons = [
    <TrendingUp key="trend" className="h-3 w-3" />,
    <UtensilsCrossed key="chef" className="h-3 w-3" />,
    <Crosshair key="target" className="h-3 w-3" />,
    null,
  ];

  const handleCopyAddress = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentToken?.name);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <div
            onClick={() => onTokenClick?.(currentToken)}
            className={cn(
              "group cursor-pointer rounded-lg border border-border/50 bg-card p-4",
              "hover:border-primary/50 hover:shadow-md"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Left */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg border-2 border-blue-500/60 bg-white/5 flex items-center justify-center overflow-hidden">
                  <div className="text-2xl">{currentToken.logo || "🪙"}</div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5 text-center leading-tight">
                  {categoryPrefix}... {truncatedAddress.slice(-4)}
                </p>
              </div>

              {/* Middle */}
              <div className="flex-1 min-w-0">
                {/* Token name and description */}
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-base text-foreground">
                    {currentToken.symbol}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {currentToken.name}
                  </span>
                  {isCopied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy
                      className="h-3 w-3 text-muted-foreground"
                      onClick={(e) => handleCopyAddress(e)}
                    />
                  )}
                </div>

                {/* Timer */}
                <div className="text-sm font-medium text-green-500 mb-2">
                  {currentToken.age}
                </div>

                {/* Icons and numbers */}
                <div className="flex items-center gap-2.5 mb-1.5 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <Search className="h-3.5 w-3.5" />
                  <Globe className="h-3.5 w-3.5" />
                  <div className="flex items-center gap-0.5">
                    <Users className="h-3.5 w-3.5" />
                    <span className="font-medium">{currentToken.holders}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Crown className="h-3.5 w-3.5" />
                    <span className="font-medium">
                      {currentToken.transactions}
                    </span>
                  </div>
                </div>

                {/* Percentage boxes */}
                <div className="flex gap-1 flex-wrap">
                  {currentToken.percentageChanges.map((change, index) => {
                    const isPositive = change > 0;
                    const icon = percentageIcons[index];
                    return (
                      <div
                        key={index}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-xl px-2 py-1  text-xs font-medium",
                          isPositive
                            ? "bg-green-500/20 text-green-500"
                            : change < 0
                            ? "bg-red-500/20 text-red-500"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {icon && icon}
                        {formatPercentage(change)}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right */}
              <div className="flex-shrink-0 text-right space-y-1.5">
                <div className="text-xs">
                  <span className="text-muted-foreground">MC </span>
                  <span className="font-medium text-blue-400">
                    {formatCurrency(currentToken.marketCap, 0)}
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">V </span>
                  <span className="font-medium text-blue-400">
                    {formatCurrency(currentToken.volume24h, 0)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  F = {currentToken.fees} TX {currentToken.txCount}
                </div>
              </div>
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">
                {currentToken.name} ({currentToken.symbol})
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">
                    ${formatCurrency(currentToken.price, 6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Cap:</span>
                  <span className="font-medium">
                    {formatCurrency(currentToken.marketCap, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume 24h:</span>
                  <span className="font-medium">
                    {formatCurrency(currentToken.volume24h, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Holders:</span>
                  <span className="font-medium">{currentToken.holders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transactions:</span>
                  <span className="font-medium">
                    {currentToken.transactions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fees:</span>
                  <span className="font-medium">{currentToken.fees}</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground break-all">
                Pair: {currentToken.pairAddress}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
});

TokenCard.displayName = "TokenCard";

export default TokenCard;
