"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component for catching and handling React errors
 * Provides graceful error handling with fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Something went wrong
            </h2>
            <p className="mb-6 text-muted-foreground">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button onClick={this.handleReset}>Try again</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

