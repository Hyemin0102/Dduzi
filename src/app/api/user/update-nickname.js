export async function POST(req) {
  try {
    const { userId, nickname } = await req.json();

    // 닉네임 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { nickName: nickname }, // 필드명 수정
    });

    if (existingUser && existingUser.id !== userId) {
      return new Response(
        JSON.stringify({ message: "이미 사용 중인 닉네임입니다." }),
        { status: 400 }
      );
    }

    // 닉네임 업데이트
    await prisma.user.update({
      where: { id: userId },
      data: { nickName: nickname }, // 필드명 수정
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("닉네임 업데이트 오류:", error);
    return new Response(
      JSON.stringify({ message: "서버 오류가 발생했습니다." }),
      { status: 500 }
    );
  }
}
