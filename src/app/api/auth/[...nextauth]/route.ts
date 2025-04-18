import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

// 인증 옵션 정의
export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
