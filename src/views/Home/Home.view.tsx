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

  //닉네임 여부
  useEffect(() => {
    if (status === "authenticated") {
      if (!session?.user?.nickName) {
        //닉네임 없으면 이동
        router.push("/set-profile");
      } else {
        //닉네임 있으면 개인페이지로 이동
        router.push(`/${session.user.nickName}`);
      }
    }
  }, [session, status, router]);

  //로그아웃
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  return session?.user?.nickName ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{session.user.nickName}님, 반갑습니다! 😎</div>
      <button onClick={() => handleSignOut()}>로그아웃</button>
    </div>
  ) : (
    <button onClick={() => router.push("/login")}>로그인 하러가기</button>
  );
};

export default HomeView;
