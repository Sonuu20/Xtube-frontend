"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Search, Bell, Upload, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "./Mobile-nav";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth system
  const pathname = usePathname();

  // Demo function to toggle login state (for demonstration purposes)
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and hamburger menu */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden bg-muted">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <MobileNav />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className=" text-primary font-bold text-2xl">
              X-tube
            </div>
          </Link>
        </div>

        {/* Search bar - desktop */}
        <div className="hidden md:flex items-center w-full max-w-xl mx-4">
          <div className="relative flex w-full">
            <Input
              type="search"
              placeholder="Search videos, channels, and more..."
              className="w-full rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-l-none"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="ml-2">
            <Mic className="h-5 w-5" />
            <span className="sr-only">Voice search</span>
          </Button>
        </div>

        {/* Search bar - mobile */}
        <div className="flex md:hidden items-center">
          {isSearchOpen ? (
            <div className="absolute inset-0 z-50 flex items-center justify-between bg-background px-4 h-16">
              <Input
                type="search"
                placeholder="Search..."
                className="flex-1 mr-2"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
        </div>

        {/* Right side - auth buttons or user menu */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Upload className="h-5 w-5" />
                <span className="sr-only">Upload</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={toggleLogin}
              >
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={toggleLogin}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
