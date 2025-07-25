import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const article = await prisma.article.update({
      where: { id },
      data: { status: "published" },
    });

    return NextResponse.json({ message: "Article published", article });
  } catch (error) {
    return NextResponse.json({ message: "Failed to publish" }, { status: 500 });
  }
}
