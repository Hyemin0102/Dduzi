"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./MyHome.view.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const MyHomeView = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("홈 세션", session);

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
    <div className={cx("Wrapper")}>
      <div className={cx("ProfileWrapper")}>
        <div
          className={cx("ProfileImage")}
          style={{
            backgroundImage: `url(${session?.user.image})`,
          }}
        />
        <div className={cx("ProfileText")}>
          안녕하세요☺️ {nickname} 님의 뜨지입니다🧶
        </div>
      </div>

      <div className={cx("ButtonWrapper")}>
        <button className={cx("ProfileEditButton", "Button")}>
          프로필 편집
        </button>
        <button className={cx("Button")} onClick={() => handleSignOut()}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyHomeView;
