"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="border-t py-6 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ArticlePortal. All rights reserved.
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button variant="link" size="sm" className="text-muted-foreground">
            Terms
          </Button>
          <Button variant="link" size="sm" className="text-muted-foreground">
            Privacy
          </Button>
          <Button variant="link" size="sm" className="text-muted-foreground">
            Contact
          </Button>
        </div>
      </div>
    </footer>
  );
}
