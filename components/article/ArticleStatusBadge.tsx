import { Badge } from "@/components/ui/badge";

export function ArticleStatusBadge({
  status,
}: {
  status: "draft" | "published";
}) {
  return (
    <Badge variant={status === "published" ? "default" : "secondary"}>
      {status === "published" ? "Published" : "Draft"}
    </Badge>
  );
}
