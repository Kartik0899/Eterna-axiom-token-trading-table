"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store/store";
import { queryClient } from "@/lib/react-query";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface ProvidersProps {
  children: React.ReactNode;
}

// Providers component - Wraps app with Redux, React Query, and Error Boundary
export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
