"use client";

import React, { memo, useState } from "react";
import {
  HelpCircle,
  List,
  ChevronDown,
  BookmarkX,
  Grid3x3,
  Volume2,
  Crosshair,
  Settings,
  Wallet,
  Filter,
  ChevronUp,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

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

// PulseControls component

const PulseControls = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between mb-2 md:mb-0">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Pulse
          </h1>

          {/* Solana Logo */}
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-background border border-border/50 flex items-center justify-center gap-0.5 p-1 rotate-90">
            <div className="h-2 md:h-2.5 w-[1.5px] bg-linear-to-b from-teal-400 via-blue-400 to-purple-400 rounded-full" />
            <div className="h-2 md:h-2.5 w-[1.5px] bg-linear-to-b from-teal-400 via-blue-400 to-purple-400 rounded-full" />
            <div className="h-2 md:h-2.5 w-[1.5px] bg-linear-to-b from-teal-400 via-blue-400 to-purple-400 rounded-full" />
          </div>

          <div className="w-4 h-4 md:w-6 md:h-6">
            <Image
              src="/bnb-logo.webp"
              alt="BNB"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>

        {/* Mobile: Accordion Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Right Section - Action Buttons and Controls */}
      {/* Desktop: Always visible */}
      <div className="hidden md:flex items-center justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="z-100">
              <p className="text-xs">Help</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                <List className="h-4 w-4" />
                <span className="text-sm">Display</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Grid View</DropdownMenuItem>
              <DropdownMenuItem>List View</DropdownMenuItem>
              <DropdownMenuItem>Compact View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <BookmarkX className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="z-100">
              <p className="text-xs">Bookmarks</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="z-100">
              <p className="text-xs">Grid</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Volume2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="z-100">
              <p className="text-xs">Volume</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <Crosshair className="h-4 w-4" />
                <sub>
                  <Settings className="h-2.5 w-2.5 absolute -top-0.5 -right-2 bg-background rounded-full" />
                </sub>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="z-100">
              <p className="text-xs">Settings</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
                <Wallet className="h-4 w-4" />
                <span className="text-sm">1</span>
                <div className="flex items-center gap-0.5 ml-1">
                  <div className="h-2.5 w-[2px] bg-linear-to-b from-teal-400 via-blue-400 to-purple-400 rounded-full" />
                  <div className="h-2.5 w-[2px] bg-linear-to-b from-teal-400 via-blue-400 to-purple-400 rounded-full" />
                  <div className="h-2.5 w-[2px] bg-linear-to-b from-teal-400 via-blue-400 to-purple-400 rounded-full" />
                </div>
                <span className="text-sm">0</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Wallet 1</DropdownMenuItem>
              <DropdownMenuItem>Connect Wallet</DropdownMenuItem>
              <DropdownMenuItem>Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipProvider>
      </div>

      {/* Mobile: Accordion Content - Wrapped items */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 px-2.5 text-xs"
                >
                  <List className="h-3.5 w-3.5" />
                  <span>Display</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Grid View</DropdownMenuItem>
                <DropdownMenuItem>List View</DropdownMenuItem>
                <DropdownMenuItem>Compact View</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BookmarkX className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-100">
                <p className="text-xs">Bookmarks</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 relative"
                >
                  <Crosshair className="h-4 w-4" />
                  <sub>
                    <Settings className="h-2.5 w-2.5 absolute -top-0.5 -right-2 bg-background rounded-full" />
                  </sub>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-100">
                <p className="text-xs">Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-100">
                <p className="text-xs">Volume</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="z-100">
                <p className="text-xs">Help</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 px-2.5 text-xs"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All</DropdownMenuItem>
                <DropdownMenuItem>Active</DropdownMenuItem>
                <DropdownMenuItem>Inactive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
});

PulseControls.displayName = "PulseControls";

export default PulseControls;
