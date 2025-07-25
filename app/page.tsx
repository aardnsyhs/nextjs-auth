import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">
        Selamat Datang di Portal Artikel
      </h1>
      <p className="text-gray-600 mb-6">
        Aplikasi sederhana untuk berbagi artikel. Login untuk mulai menulis!
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    </main>
  );
}
