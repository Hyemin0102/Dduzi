import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import prisma from "app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// 인증 옵션 정의
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), //db사용자 저장
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
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
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false; // 로그인 실패
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      console.log("JWT 콜백:", { token, account });
      if (account && account.access_token && account.id) {
        token.accessToken = account.access_token;
        token.id = account.id as string;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
