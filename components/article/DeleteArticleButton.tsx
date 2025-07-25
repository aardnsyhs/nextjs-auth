"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function DeleteArticleButton({
  id,
  onSuccess,
}: {
  id: string;
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm("Yakin ingin menghapus artikel ini?");
    if (!confirmed) return;

    setIsLoading(true);

    const res = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });

    setIsLoading(false);

    if (res.ok) {
      toast.success("Successfully deleted article");
      onSuccess();
    } else {
      toast.error("Failed to delete article");
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
}
