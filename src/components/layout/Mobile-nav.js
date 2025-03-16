"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ThumbsUp,
  History,
  Users,
  LifeBuoy,
  Settings,
  LogOut,
  Flame,
  Clock,
  Bookmark,
  Video,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MobileNav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth system

  const mainNavItems = [
    { name: "Home", href: "/", icon: Home },
    // { name: "Trending", href: "/trending", icon: Flame },
    { name: "Subscriptions", href: "/subscriptions", icon: Users },
  ];

  const libraryItems = [
    { name: "History", href: "/history", icon: History },
    { name: "Liked Videos", href: "/liked", icon: ThumbsUp },
    // { name: "Watch Later", href: "/watch-later", icon: Clock },
    { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  ];

  const creatorItems = [
    { name: "My Content", href: "/my-content", icon: Video },
    { name: "Dashboard", href: "/dashboard", icon: UserCircle },
  ];

  const bottomItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/support", icon: LifeBuoy },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-gradient-purple font-bold text-2xl">
              X-tube
            </div>
          </Link>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {isLoggedIn && (
          <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-muted/50">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">@johndoe</p>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <MobileNavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>

        <Separator className="my-4" />

        <div>
          <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
            Library
          </h3>
          <nav className="flex flex-col gap-1">
            {libraryItems.map((item) => (
              <MobileNavItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>

        {isLoggedIn && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
                Creator Studio
              </h3>
              <nav className="flex flex-col gap-1">
                {creatorItems.map((item) => (
                  <MobileNavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                  />
                ))}
              </nav>
            </div>
          </>
        )}

        <Separator className="my-4" />

        <nav className="flex flex-col gap-1">
          {bottomItems.map((item) => (
            <MobileNavItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t mt-auto">
        {isLoggedIn ? (
          <Button
            variant="outline"
            className="w-full justify-center gap-2"
            onClick={() => setIsLoggedIn(false)}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsLoggedIn(true)}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setIsLoggedIn(true)}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileNavItem({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{item.name}</span>
    </Link>
  );
}
