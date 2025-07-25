import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!article || article.author.email !== session.user.email) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await prisma.article.delete({ where: { id: params.id } });

  return NextResponse.json({ message: "Article deleted" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: { author: true },
  });

  if (!article || article.author.email !== session.user.email) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = ArticleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  const updated = await prisma.article.update({
    where: { id: params.id },
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
    },
  });

  return NextResponse.json(updated);
}
