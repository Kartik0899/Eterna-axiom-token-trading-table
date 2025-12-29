"use client";

import React, { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TokenColumn from "@/components/TokenColumn";
import TokenModal from "@/components/TokenModal";
import PulseControls from "@/components/PulseControls";
import { useTokenData } from "@/hooks/useTokenData";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setConnectionStatus, setSelectedToken } from "@/store/slices/appSlice";
import { setTokens, updateTokenPrice } from "@/store/slices/tokenSlice";
import { Token, PriceUpdate, TokenCategory } from "@/lib/types";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Main Pulse page component
 * Features: Three token columns, real-time updates, modal interactions
 */
export default function PulsePage() {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TokenCategory>("new-pairs");

  const selectedToken = useAppSelector((state) => state.app.selectedToken);
  const isConnected = useAppSelector((state) => state.app.isConnected);

  const tabs: { id: TokenCategory; label: string }[] = [
    { id: "new-pairs", label: "New Pairs" },
    { id: "final-stretch", label: "Final Stretch" },
    { id: "migrated", label: "Migrated" },
  ];

  // Fetch token data for each category
  const {
    data: newPairsTokens = [],
    isLoading: newPairsLoading,
    refetch: refetchNewPairs,
  } = useTokenData("new-pairs", 5);

  const {
    data: finalStretchTokens = [],
    isLoading: finalStretchLoading,
    refetch: refetchFinalStretch,
  } = useTokenData("final-stretch", 4);

  const {
    data: migratedTokens = [],
    isLoading: migratedLoading,
    refetch: refetchMigrated,
  } = useTokenData("migrated", 5);

  // Store tokens in Redux when data is fetched
  useEffect(() => {
    if (newPairsTokens.length > 0) {
      dispatch(setTokens(newPairsTokens));
    }
  }, [newPairsTokens, dispatch]);

  useEffect(() => {
    if (finalStretchTokens.length > 0) {
      dispatch(setTokens(finalStretchTokens));
    }
  }, [finalStretchTokens, dispatch]);

  useEffect(() => {
    if (migratedTokens.length > 0) {
      dispatch(setTokens(migratedTokens));
    }
  }, [migratedTokens, dispatch]);

  // WebSocket handler for price updates
  const handlePriceUpdate = useCallback(
    (update: PriceUpdate) => {
      // Update token price in Redux store
      dispatch(updateTokenPrice(update));
    },
    [dispatch]
  );

  useWebSocket(handlePriceUpdate, isConnected);

  // Set connection status on mount
  useEffect(() => {
    dispatch(setConnectionStatus(true));
    return () => {
      dispatch(setConnectionStatus(false));
    };
  }, [dispatch]);

  const handleTokenClick = useCallback(
    (token: Token) => {
      dispatch(setSelectedToken(token));
      setModalOpen(true);
    },
    [dispatch]
  );

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        {/* Main Content */}
        <main className="flex-1 mx-auto px-4 py-6 w-full">
          {/* Controls Bar */}
          <PulseControls />

          {/* Responsive Tabs - Show on mobile/tablet (below lg breakpoint) */}
          <div className="lg:hidden mb-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative pb-3 px-1 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted/50"
              >
                <Filter className="h-4 w-4 text-foreground" />
              </Button>
            </div>
          </div>

          {/* Desktop: Three Columns | Mobile/Tablet: Single Column with Tabs */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-3 h-[calc(100vh-280px)]">
            <TokenColumn
              category="new-pairs"
              tokens={newPairsTokens}
              isLoading={newPairsLoading}
              onTokenClick={handleTokenClick}
            />
            <TokenColumn
              category="final-stretch"
              tokens={finalStretchTokens}
              isLoading={finalStretchLoading}
              onTokenClick={handleTokenClick}
            />
            <TokenColumn
              category="migrated"
              tokens={migratedTokens}
              isLoading={migratedLoading}
              onTokenClick={handleTokenClick}
            />
          </div>

          {/* Mobile/Tablet: Show only active tab's column (hide header since tabs replace it) */}
          <div className="lg:hidden h-[calc(100vh-280px)]">
            {activeTab === "new-pairs" && (
              <TokenColumn
                category="new-pairs"
                tokens={newPairsTokens}
                isLoading={newPairsLoading}
                onTokenClick={handleTokenClick}
                hideHeader={true}
              />
            )}
            {activeTab === "final-stretch" && (
              <TokenColumn
                category="final-stretch"
                tokens={finalStretchTokens}
                isLoading={finalStretchLoading}
                onTokenClick={handleTokenClick}
                hideHeader={true}
              />
            )}
            {activeTab === "migrated" && (
              <TokenColumn
                category="migrated"
                tokens={migratedTokens}
                isLoading={migratedLoading}
                onTokenClick={handleTokenClick}
                hideHeader={true}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Token Modal */}
        <TokenModal
          token={selectedToken}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </TooltipProvider>
  );
}
