"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      className={`mt-4 text-sm text-red-500 ${className}`}
    >
      Logout
    </Button>
  );
}
