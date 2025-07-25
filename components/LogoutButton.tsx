"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => {
        toast.success("You have been logged out.");
        signOut({ callbackUrl: "/" });
      }}
      className={`mt-4 text-sm text-red-500 ${className}`}
    >
      Logout
    </Button>
  );
}
