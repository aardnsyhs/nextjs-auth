"use client";

import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

export function EditArticleButton({
  article,
  onEdit,
  size,
}: {
  article: Article;
  onEdit: (a: Article) => void;
  size?: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        onEdit(article);
      }}
    >
      Edit
    </Button>
  );
}
