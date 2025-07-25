"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function PublishArticleButton({
  id,
  onSuccess,
  size,
}: {
  id: string;
  onSuccess: () => void;
  size?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/articles/${id}/publish`, {
      method: "PATCH",
    });

    setIsLoading(false);

    if (res.ok) {
      toast.success("Successfully published article");
      onSuccess();
    } else {
      toast.error("Failed to publish article");
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePublish}
      disabled={isLoading}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Publishing..." : "Publish"}
    </Button>
  );
}
