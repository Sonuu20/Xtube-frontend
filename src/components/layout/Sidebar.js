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
  Twitter,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function Sidebar({ className }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth system

  const mainNavItems = [
    { name: "Home", href: "/", icon: Home },
    {name: "Tweets", href: "/tweets", icon: Twitter},
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
    <aside className={cn("pb-12 w-[240px] hidden md:block", className)}>
      <ScrollArea className="h-[calc(100vh-4rem)] py-6 pr-6">
        <div className="flex flex-col gap-4 px-4">
          <nav className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          <Separator className="my-2" />

          <div>
            <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
              Library
            </h3>
            <nav className="flex flex-col gap-1">
              {libraryItems.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </nav>
          </div>

          {isLoggedIn && (
            <>
              <Separator className="my-2" />
              <div>
                <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
                  Creator Studio
                </h3>
                <nav className="flex flex-col gap-1">
                  {creatorItems.map((item) => (
                    <NavItem
                      key={item.href}
                      item={item}
                      isActive={pathname === item.href}
                    />
                  ))}
                </nav>
              </div>
            </>
          )}

          <Separator className="my-2" />

          <nav className="flex flex-col gap-1 mt-auto">
            {bottomItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
            {isLoggedIn && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-4"
                onClick={() => setIsLoggedIn(false)}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            )}
          </nav>

          {!isLoggedIn && (
            <div className="mt-4 px-4 py-4 border rounded-lg">
              <p className="text-sm mb-4">
                Sign in to like videos, comment, and subscribe.
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setIsLoggedIn(true)}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

function NavItem({ item, isActive }) {
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
      <Icon className="h-4 w-4" />
      <span>{item.name}</span>
    </Link>
  );
}

