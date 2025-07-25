import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const article = await prisma.article.create({
    data: {
      title,
      content,
      authorId: user!.id,
    },
  });

  return NextResponse.json(article);
}
