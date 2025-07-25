export type ArticleStatus = "draft" | "published";

export type Article = {
  id: string;
  title: string;
  content: string;
  status: ArticleStatus;
  createdAt: string;
};
