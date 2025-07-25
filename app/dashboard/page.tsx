"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import CreateFormArticle from "@/components/CreateFormArticle";
import { toast } from "sonner";
import { Article } from "@/types/article";
import { PublishArticleButton } from "@/components/article/PublishArticleButton";
import { EditArticleButton } from "@/components/article/EditArticleButton";
import { DeleteArticleButton } from "@/components/article/DeleteArticleButton";
import { ArticleStatusBadge } from "@/components/article/ArticleStatusBadge";
import { EditDialogArticle } from "@/components/article/EditDialogArticle";

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
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <LogoutButton className="top-4 right-4 absolute" />
      <h1 className="text-2xl font-bold">Dashboard Artikel</h1>
      <CreateFormArticle fetchArticles={fetchArticles} />
      <div className="pt-6">
        <h2 className="font-semibold mb-2">Artikel Saya</h2>
        {articles.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel</p>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="border rounded p-4 mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{a.title}</h3>
                <div className="flex gap-2">
                  {a.status === "draft" && (
                    <PublishArticleButton id={a.id} onSuccess={fetchArticles} />
                  )}
                  <EditArticleButton
                    article={a}
                    onEdit={(a) => {
                      setEditingArticle(a);
                      setEditTitle(a.title);
                      setEditContent(a.content);
                    }}
                  />
                  <DeleteArticleButton id={a.id} onSuccess={fetchArticles} />
                </div>
              </div>
              <p className="text-gray-600">{a.content}</p>
              <ArticleStatusBadge status={a.status} />
            </div>
          ))
        )}
        {editingArticle && (
          <EditDialogArticle
            editingArticle={editingArticle}
            setEditingArticle={setEditingArticle}
            onSubmitEdit={submitEdit}
          />
        )}
      </div>
    </div>
  );
}
