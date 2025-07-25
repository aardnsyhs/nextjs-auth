"use client";

import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/LogoutButton";
import CreateFormArticle from "@/components/CreateFormArticle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  content: string;
}

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

  async function submitEdit() {
    if (!editingArticle) return;

    const res = await fetch(`/api/articles/${editingArticle.id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editTitle, content: editContent }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("Successfully updated article");
      setEditingArticle(null);
      fetchArticles();
    }
  }

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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingArticle(a);
                      setEditTitle(a.title);
                      setEditContent(a.content);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      const confirmed = confirm(
                        "Yakin ingin menghapus artikel ini?"
                      );
                      if (!confirmed) return;
                      const res = await fetch(`/api/articles/${a.id}`, {
                        method: "DELETE",
                      });
                      if (res.ok) {
                        toast.success("Successfully deleted article");
                        fetchArticles();
                      } else {
                        toast.error("Failed to delete article");
                      }
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
              <p className="text-gray-600">{a.content}</p>
            </div>
          ))
        )}
        {editingArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-[90%] max-w-md space-y-4">
              <h2 className="text-lg font-semibold">Edit Artikel</h2>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setEditingArticle(null)}>
                  Cancel
                </Button>
                <Button onClick={submitEdit}>Save</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
