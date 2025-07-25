import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateFormArticle({
  fetchArticles,
}: {
  fetchArticles: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setTitle("");
      setContent("");
      fetchArticles();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="Judul Artikel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Konten artikel..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit">Tambah Artikel</Button>
    </form>
  );
}
