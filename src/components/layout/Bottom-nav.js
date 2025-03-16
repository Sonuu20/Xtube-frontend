"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, History, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Tweet", href: "/tweet", icon: MessageSquare },
    { name: "History", href: "/history", icon: History },
    { name: "My Content", href: "/my-content", icon: Video },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-4">
        {navItems.map((item) => (
          <BottomNavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}

function BottomNavItem({ item, isActive }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex flex-col items-center justify-center",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs mt-1">{item.name}</span>
    </Link>
  );
}
