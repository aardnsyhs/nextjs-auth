"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ArticlePortal</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className="text-sm font-medium hover:text-primary">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/articles" passHref>
                <NavigationMenuLink className="text-sm font-medium hover:text-primary">
                  Articles
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" passHref>
                <NavigationMenuLink className="text-sm font-medium hover:text-primary">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <span className="text-sm font-medium">
                Hello, {session.user.name || session.user.email}
              </span>
              <Button variant="ghost" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
