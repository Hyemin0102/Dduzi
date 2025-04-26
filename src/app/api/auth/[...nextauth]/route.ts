import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import prisma from "app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// 인증 옵션 정의
export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma), //db사용자 저장
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false; // 로그인 실패
      }

      return true;
    },
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.nickName = (user as any).nickName;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
