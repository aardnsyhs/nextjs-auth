import { Badge } from "@/components/ui/badge";

export function ArticleStatusBadge({
  status,
  className,
}: {
  status: "draft" | "published";
  className?: string;
}) {
  return (
    <Badge
      variant={status === "published" ? "default" : "secondary"}
      className={className}
    >
      {status === "published" ? "Published" : "Draft"}
    </Badge>
  );
}
