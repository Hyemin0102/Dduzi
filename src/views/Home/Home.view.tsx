"use client";
import React, { useEffect, useState } from "react";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

const HomeView = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("홈에서 status", status);

  //닉네임 여부
  useEffect(() => {
    if (status === "authenticated") {
      if (!session?.user?.nickName) {
        //닉네임 없으면 이동
        router.push("/accounts/set-nickname");
      } else {
        //닉네임 있으면 개인페이지로 이동
        router.push(`/${session.user.nickName}`);
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }
  //로그인 안되어있으면 -> /login 이동 -> 로그인했을때 돌아와

  return <button onClick={() => router.push("/login")}>로그인 하러가기</button>;
};

export default HomeView;
