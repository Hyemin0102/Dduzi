import { config } from "dotenv";
import NextAuth, { AuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

config({ path: ".env.local" });

console.log("KAKAO_CLIENT_ID:", process.env.KAKAO_CLIENT_ID);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// callbacks: {
//   async jwt({ token, account, profile }) {
//     // JWT 콜백
//     if (account) {
//       token.accessToken = account.access_token;
//       token.id = profile?.id;
//     }
//     return token;
//   },
//   async session({ session, token, user }) {
//     // 세션 콜백
//     if (token) {
//       session.user.id = token.id as string;
//       session.accessToken = token.accessToken as string;
//     }
//     return session;
//   },
// },
// pages: {
//   signIn: "/",
// },
// secret: process.env.NEXTAUTH_SECRET,
