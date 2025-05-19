import { getServerSession } from "next-auth";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    const { profileMemo } = await req.json();

    const userEmail = session.user.email;

    if (!session.user.email) {
      return NextResponse.json(
        { error: "이메일 정보가 없습니다." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: { profileMemo: profileMemo },
    });

    return NextResponse.json({
      success: true,
      user: { profileMemo: updatedUser.profileMemo },
    });
  } catch (error) {
    console.error("프로필 메모 업데이트 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
