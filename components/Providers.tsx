"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./article/Navbar";
import Footer from "./article/Footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="container mx-auto px-4">
        <Navbar />
        <main>{children}</main>
        <Toaster richColors position="top-center" />
        <Footer />
      </div>
    </SessionProvider>
  );
}
