"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Article } from "@/types/article";

interface EditDialogArticleProps {
  editingArticle: Article | null;
  setEditingArticle: (article: Article | null) => void;
  onSubmitEdit: (article: Article) => Promise<void>;
}

export function EditDialogArticle({
  editingArticle,
  setEditingArticle,
  onSubmitEdit,
}: EditDialogArticleProps) {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingArticle) {
      setEditTitle(editingArticle.title);
      setEditContent(editingArticle.content);
    }
  }, [editingArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      setIsLoading(true);
      await onSubmitEdit({
        ...editingArticle,
        title: editTitle,
        content: editContent,
      });
    } catch (error) {
      console.error("Failed to update article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={!!editingArticle}
      onOpenChange={(open) => {
        if (!open) setEditingArticle(null);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>
              Change the title and content of your article.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="edit-content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
