"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ListCardArticleSkeleton from "@/components/article/ListCardArticleSkeleton";

interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    name: string | null;
    email: string;
  };
  createdAt?: string;
}

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/articles/public")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.author.name &&
        article.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Share Your Knowledge with the World
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A platform for writers to publish their thoughts and readers to
            discover insightful articles.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/articles">
              <Button variant="outline" size="lg">
                Browse Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="py-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
          <div className="w-full md:w-64">
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Separator className="my-6" />
        {isLoading ? (
          <ListCardArticleSkeleton />
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                {searchQuery
                  ? "No articles match your search."
                  : "No articles published yet."}
              </p>
              {searchQuery ? (
                <Button variant="link" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              ) : (
                <Link href="/register">
                  <Button variant="link">Be the first to publish</Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-lg transition-shadow"
              >
                <Link href={`/article/${article.id}`}>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {article.title}
                    </CardTitle>
                    {article.createdAt && (
                      <CardDescription>
                        {new Date(article.createdAt).toLocaleDateString()}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-muted-foreground">
                      {article.content}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src=""
                        alt={article.author.name || article.author.email}
                      />
                      <AvatarFallback>
                        {(article.author.name || article.author.email)
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {article.author.name ||
                          article.author.email.split("@")[0]}
                      </p>
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
