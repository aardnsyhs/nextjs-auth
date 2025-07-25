"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    name: string | null;
    email: string;
  };
}

export default function LandingPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/articles/public")
      .then((res) => res.json())
      .then(setArticles);
  }, []);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-2">Portal Artikel</h1>
      <p className="text-gray-600 mb-6">
        Tempat berbagi tulisan dari para penulis.
      </p>
      <div className="flex gap-4 mb-10">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Semua Artikel</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">Belum ada artikel</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded shadow-sm">
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-gray-600">{article.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Ditulis oleh: {article.author.name || article.author.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
