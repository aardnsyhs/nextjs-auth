"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export default function CreateFormArticle({
  fetchArticles,
}: {
  fetchArticles: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, status }),
      });

      if (res.ok) {
        toast.success(
          status === "draft"
            ? "Draft saved successfully"
            : "Article published successfully"
        );
        setTitle("");
        setContent("");
        fetchArticles();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to create article");
      }
    } catch (error) {
      toast.error("An error occurred while creating the article");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-3 bg-white p-4 rounded-xl border"
    >
      <Input
        placeholder="Title article..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Content article..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={isSubmitting}
          onClick={() => handleSubmit("draft")}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={() => handleSubmit("published")}
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
