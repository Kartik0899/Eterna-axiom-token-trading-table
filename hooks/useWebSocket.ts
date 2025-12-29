import { useEffect, useRef, useCallback } from "react";
import { PriceUpdate } from "@/lib/types";

/**
 * Custom hook for WebSocket connection with price updates
 * Mocks real-time price updates for tokens
 */
export function useWebSocket(
  onMessage: (update: PriceUpdate) => void,
  isConnected: boolean
) {
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    // Mock WebSocket using setInterval
    // In production, this would be a real WebSocket connection
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Generate realistic token IDs based on actual tokens from the image
    const tokenIds = [
      "new-pairs-MEMECHASE-0",
      "new-pairs-STEVE-1",
      "new-pairs-VTIFC-2",
      "new-pairs-Tiotlon-3",
      "new-pairs-OKS-4",
      "final-stretch-VTIFC-0",
      "final-stretch-INNO-1",
      "final-stretch-NDI69...-2",
      "final-stretch-BART-3",
      "migrated-PET-0",
      "migrated-$SWAL-1",
      "migrated-crashy-2",
      "migrated-IMPEROOTER-3",
      "migrated-BART-4",
    ];

    intervalRef.current = setInterval(() => {
      // Select a random token
      const randomTokenId = tokenIds[Math.floor(Math.random() * tokenIds.length)];
      
      // Generate realistic price change (-2% to +2% for quick updates)
      const priceChangePercent = (Math.random() - 0.5) * 4;
      
      // Get base values (in a real app, these would come from the store)
      const basePrice = Math.random() * 0.001 + 0.0001;
      const newPrice = basePrice * (1 + priceChangePercent / 100);
      const baseMarketCap = Math.random() * 1000000 + 100000;
      const newMarketCap = baseMarketCap * (1 + priceChangePercent / 100);

      // Generate new percentage changes
      const percentageChanges = Array.from({ length: 4 }, () => {
        const change = (Math.random() - 0.3) * 200;
        return Math.round(change);
      });

      const update: PriceUpdate = {
        tokenId: randomTokenId,
        price: Math.max(0.00001, newPrice),
        priceChange24h: priceChangePercent,
        volume24h: Math.random() * 500000 + 50000,
        marketCap: Math.max(50000, newMarketCap),
        percentageChanges,
        timestamp: Date.now(),
      };

      onMessage(update);
    }, 500); // Update every 500ms for faster updates
  }, [onMessage]);

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isConnected, connect, disconnect]);

  return { connect, disconnect };
}

