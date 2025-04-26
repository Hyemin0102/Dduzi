import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]/route";
import { setEngine } from "crypto";
import prisma from "app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않는 요청입니다." });
  }

  try {
    const session = await getServerSession(req, res, authOptions); //현재 세션 확인

    if (!session || !session.accessToken) {
      return res.status(401).json({ error: "Unauthorized" }); //권한없음 에러
    }

    const response = await fetch("https://kapi.kakao.com/v1/user/unlink", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("카카오 연결 끊기 실패:", data);
      return res
        .status(response.status)
        .json({ error: "카카오 연결 끊기 실패", details: data });
    }

    //OAuth 연결 해제
    // await prisma.account.deleteMany({
    //   where: {
    //     id: session.user.id,
    //     provider: "kakao",
    //   },
    // });

    return res
      .status(200)
      .json({ success: true, message: "카카오 연결이 해제되었습니다." });
  } catch (error) {
    console.error("연결 끊기 처리 중 오류 발생:", error);
    return res.status(500).json({ error: "서버 오류" });
  }
}
