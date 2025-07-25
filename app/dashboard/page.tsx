"use client";

import { useEffect, useState } from "react";
import CreateFormArticle from "@/components/CreateFormArticle";
import { toast } from "sonner";
import { Article } from "@/types/article";
import { PublishArticleButton } from "@/components/article/PublishArticleButton";
import { EditArticleButton } from "@/components/article/EditArticleButton";
import { DeleteArticleButton } from "@/components/article/DeleteArticleButton";
import { ArticleStatusBadge } from "@/components/article/ArticleStatusBadge";
import { EditDialogArticle } from "@/components/article/EditDialogArticle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DashboardClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchArticles = async () => {
    const res = await fetch("/api/user-articles");
    const data = await res.json();
    setArticles(data);
  };

  const submitEdit = async (updatedArticle: Article) => {
    try {
      const res = await fetch(`/api/articles/${updatedArticle.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: updatedArticle.title,
          content: updatedArticle.content,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update article");

      toast.success("Successfully updated article");
      setEditingArticle(null);
      await fetchArticles();
    } catch (error) {
      toast.error("Failed to update article");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Artikel
            </h1>
            <p className="text-muted-foreground">Kelola artikel Anda di sini</p>
          </div>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Buat Artikel Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateFormArticle fetchArticles={fetchArticles} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Artikel Saya</CardTitle>
            </CardHeader>
            <CardContent>
              {articles.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Anda belum memiliki artikel
                  </p>
                  <Button variant="link" className="mt-2">
                    Buat artikel pertama Anda
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Card
                      key={article.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {article.title}
                            </h3>
                            <ArticleStatusBadge
                              status={article.status}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex gap-2">
                            {article.status === "draft" && (
                              <PublishArticleButton
                                id={article.id}
                                onSuccess={fetchArticles}
                                size="sm"
                              />
                            )}
                            <EditArticleButton
                              article={article}
                              onEdit={(a) => {
                                setEditingArticle(a);
                                setEditTitle(a.title);
                                setEditContent(a.content);
                              }}
                              size="sm"
                            />
                            <DeleteArticleButton
                              id={article.id}
                              onSuccess={fetchArticles}
                              size="sm"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground line-clamp-2">
                          {article.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          {editingArticle && (
            <EditDialogArticle
              editingArticle={editingArticle}
              setEditingArticle={setEditingArticle}
              onSubmitEdit={submitEdit}
            />
          )}
        </div>
      </main>
    </div>
  );
}
