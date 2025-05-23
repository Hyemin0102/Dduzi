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
    async signIn({ user, account, profile }) {
      // 로그인 실패
      if (!user.email) {
        return false;
      }

      console.log("user 내용:", user);
      return true;
    },

    async jwt({ token, account, user }) {
      // 로그인 시 user 정보로 token 업데이트
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      if (token.email) {
        const userFromDb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });

        if (userFromDb) {
          token.nickName = userFromDb.nickName;
          token.image = userFromDb.image;
          token.profileMemo = userFromDb.profileMemo;
        }
      }

      //새 로그인 세션이면 provider 정보 업데이트
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
      }

      console.log("JWT 토큰 내용:", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.provider = token.provider;

        session.user.id = token.id;
        session.user.nickName = token.nickName;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.profileMemo = token.profileMemo;
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
