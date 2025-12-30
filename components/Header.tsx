"use client";

import React, { memo, useState } from "react";
import { Search, LogIn, UserPlus, Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { SearchDialog } from "./SearchDialog";
import { cn } from "@/lib/utils";

const Header = memo(() => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    "Discover",
    "Pulse",
    "Trackers",
    "Perpetuals",
    "Yield",
    "Vision",
    "Portfolio",
    "Rewards",
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-primary rounded-sm" />
            <span className="font-semibold text-foreground">Axiom</span>
          </div>

          {/* Desktop: Normal nav | Tablet/Mobile: Hidden (use hamburger) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap flex-shrink-0",
                  item === "Pulse" && "text-primary"
                )}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Search Dialog */}
          <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

          {/* Network Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 hidden sm:flex">
                SOL
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>SOL</DropdownMenuItem>
              <DropdownMenuItem>ETH</DropdownMenuItem>
              <DropdownMenuItem>BTC</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop: Auth buttons | Tablet/Mobile: Hidden (in drawer) */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-9">
              Sign up
            </Button>
            <Button size="sm" className="h-9">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Tablet/Mobile: Hamburger menu */}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="overflow-y-auto">
              <DrawerHeader className="mb-4">
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-4 px-4 pb-4 flex-1">
                {/* Navigation items in drawer */}
                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href="#"
                      onClick={() => setDrawerOpen(false)}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary py-2 px-2 rounded-md hover:bg-muted/50",
                        item === "Pulse" && "text-primary bg-primary/10"
                      )}
                    >
                      {item}
                    </a>
                  ))}
                </nav>

                {/* Divider */}
                <div className="border-t border-border my-2" />

                {/* Auth buttons in drawer */}
                <div className="flex flex-col gap-3 mt-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign up
                  </Button>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
