"use client";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NickNameView = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const decodedPathname = decodeURIComponent(pathname);
  const nickname = decodedPathname.slice(1);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.nickName) {
      // 현재 URL의 닉네임과 로그인한 사용자의 닉네임이 다르면 리다이렉트
      if (!nickname.includes(session.user.nickName)) {
        router.replace(`/${session.user.nickName}`);
      }
    }
  }, [session, status, pathname, router]);

  //로그아웃
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div>
      <div>{nickname}님의 페이지</div>
      <button onClick={() => handleSignOut()}>로그아웃</button>
    </div>
  );
};

export default NickNameView;
