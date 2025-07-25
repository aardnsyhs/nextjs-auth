"use client";

import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

export function EditArticleButton({
  article,
  onEdit,
}: {
  article: Article;
  onEdit: (a: Article) => void;
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
