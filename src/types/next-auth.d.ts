import { DefaultSession, Profile as NextAuthProfile } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    accessToken?: string;
  }

  // Profile 인터페이스 확장
  interface Profile extends NextAuthProfile {
    id?: string;
    // 카카오에서 제공하는 다른 프로필 필드들
    kakao_account?: {
      email?: string;
      profile?: {
        nickname?: string;
        thumbnail_image_url?: string;
      };
    };
  }
}
