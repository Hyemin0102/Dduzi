import { authOptions } from "app/api/auth/[...nextauth]/route";
import prisma from "app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const data = await req.json();

    if (!data.image) {
      return NextResponse.json(
        { error: "작품 이미지는 필수입니다." },
        { status: 400 }
      );
    }

    const designData = JSON.stringify(data.design || {});
    const suppliesData = JSON.stringify(data.supplies || {});

    const post = await prisma.post.create({
      data: {
        user: {
          connect: { id: Number(session.user.id) },
        },
        image: data.image,
        content: data.content || "",
        design: designData,
        supplies: suppliesData,
        logMemo: data.logMemo || "",
      },
    });

    return NextResponse.json({
      success: true,
      postId: post.id,
    });
  } catch (error) {}
}
