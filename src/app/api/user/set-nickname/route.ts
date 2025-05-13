import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "app/lib/prisma";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("api 세션", session);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { nickname, image } = body;

    // 닉네임 중복 체크
    const existingUser = await prisma.user.findFirst({
      where: { nickName: nickname },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 닉네임입니다." },
        { status: 409 }
      );
    }

    if (!session.user.email) {
      return NextResponse.json(
        { error: "이메일 정보가 없습니다." },
        { status: 400 }
      );
    }

    //닉네임, 프로필 랜덤 이미지 업데이트
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        nickName: nickname,
        image: image,
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: updatedUser.id, nickName: updatedUser.nickName },
    });
  } catch (error) {
    console.error("닉네임 설정 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
