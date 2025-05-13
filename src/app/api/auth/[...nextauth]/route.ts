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
      // 로그인 실패
      if (!user.email) {
        return false;
      }
      console.log("user 내용:", user);
      return true;
    },

    async jwt({ token, account }) {
      //account는 최초 로그인 시 생성
      if (token.email) {
        const userFromDb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });

        if (userFromDb && userFromDb.nickName) {
          token.nickName = userFromDb.nickName;
        }

        if (userFromDb && userFromDb.image) {
          token.image = userFromDb.image;
        }
      }

      if (account) {
        //최초 로그인 시 token에 업데이트
        token.id = account.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }
      console.log("account 내용:", account);
      console.log("JWT 토큰 내용:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.provider = token.provider;
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.nickName = token.nickName;
        session.user.image = token.image;
      }
      console.log("session 내용:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
