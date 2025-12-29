"use client";

import React, { memo } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  Wallet,
  Twitter,
  Bell,
  HelpCircle,
  MessageCircle,
  Palette,
  FileText,
  Globe,
  Activity,
  BarChart3,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";

const trackerIcons = {
  wallet: Wallet,
  twitter: Twitter,
  discover: Globe,
  pulse: Activity,
  pnl: BarChart3,
};

const notificationIcons = {
  notifications: Bell,
  theme: Palette,
  messages: MessageCircle,
  files: FileText,
};

/**
 * Footer component - Bottom navigation and status indicators
 * Features: Wallet, social links, connection status, global settings
 */
const Footer = memo(() => {
  const isConnected = useAppSelector(
    (state: RootState) => state.app.isConnected
  );

  return (
    <>
      <footer className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-auto overflow-y-visible">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left Section - Preset and Controls */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="h-9">
              PRESET 1
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/80 border border-border/50 hover:bg-muted transition-colors"
                  >
                    <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">
                      1
                    </span>
                    <div className="flex items-center gap-0.5 ml-1 -rotate-90">
                      <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                      <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                      <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-foreground">
                      0
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent className="z-100">
                  <p className="text-xs text-foreground">Active wallets</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Middle Section - Navigation and PnL */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <TooltipProvider>
                {Object.entries(trackerIcons).map(([key, Icon]) => (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <a
                        href="#"
                        className="flex items-center gap-2 h-9 px-3 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="capitalize">{key}</span>
                        <sup className="h-1.5 w-1.5 ml-1 rounded-full bg-green-500"></sup>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent className="z-100">
                      <p className="text-xs text-foreground capitalize">
                        {key}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/80 border border-border/50">
              <div className="flex items-center gap-0.5 -rotate-90">
                <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
                <div className="h-2.5 w-[2px] bg-linear-to-b from-purple-400 via-blue-400 to-green-400 rounded-full" />
              </div>
              <span className="text-xs font-medium text-green-500">
                $124.54
              </span>
            </div>
          </div>

          {/* Right Section - Status and Links */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center gap-2 text-sm",
                isConnected ? "text-green-500" : "text-red-500"
              )}
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  isConnected ? "bg-green-500" : "bg-red-500"
                )}
              />
              <span>{isConnected ? "Connected" : "Disconnected"}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  GLOBAL
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Global</DropdownMenuItem>
                <DropdownMenuItem>Local</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              {Object.entries(notificationIcons).map(([key, Icon]) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Icon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="z-100">
                    <p className="text-xs text-foreground capitalize">{key}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </footer>
    </>
  );
});

Footer.displayName = "Footer";

export default Footer;
