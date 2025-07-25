import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface DetailProps {
  params: {
    id: string;
  };
}

export default async function ArticleDetailPage({ params }: DetailProps) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-muted-foreground text-sm mb-4">
        by {article.author?.name || "Unknown"} •{" "}
        {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-neutral">
        <p>{article.content}</p>
      </div>
    </div>
  );
}
