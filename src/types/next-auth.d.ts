import { DefaultSession, Profile as NextAuthProfile } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
    user: {
      id?: any;
      nickName?: any;
    } & DefaultSession["user"];
  }

  interface Profile extends NextAuthProfile {
    id?: any;
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

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: any;
    accessToken?: string;
    nickname?: string;
    refreshToken?: string;
    provider?: string;
  }
}
