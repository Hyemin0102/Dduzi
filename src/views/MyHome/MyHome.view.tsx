"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./MyHome.view.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const MyHomeView = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [memo, setMemo] = useState("");

  console.log("홈 세션", session);

  const decodedPathname = decodeURIComponent(pathname);
  const nickname = decodedPathname.slice(1);

  useEffect(() => {
    const updateSessionData = async () => {
      if (status === "authenticated") {
        await update();
        console.log("세션 정보 갱신됨:", session);
      }
    };
    if (status === "authenticated" && session?.user?.nickName) {
      // 현재 URL의 닉네임과 로그인한 사용자의 닉네임이 다르면 리다이렉트
      if (!nickname.includes(session.user.nickName)) {
        router.replace(`/${session.user.nickName}`);
      }
    }

    setMemo(session?.user.profileMemo);
  }, [session, status, pathname, router]);

  //로그아웃
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  //프로필 편집
  const handleToProfileEdit = () => {
    router.push("/accounts/edit");
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
        <div className={cx("ProfileMemo")}>{memo ?? "프로필 메모 초기"}</div>
      </div>

      <div className={cx("ButtonWrapper")}>
        <button
          className={cx("ProfileEditButton", "Button")}
          onClick={() => handleToProfileEdit()}
        >
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
