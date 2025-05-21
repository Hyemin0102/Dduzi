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

  //제일 처음 열렸어. -> 로그인 체크 -> 로그인 상태면 개인페이지 이동, 비로그인 상태면 로그인 페이지로 이동

  //닉네임 여부
  useEffect(() => {
    if (status === "authenticated") {
      //로그인 상태면
      router.push(`/${session.user.nickName}`);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div>비회원 랜딩페이지</div>
      <button onClick={() => router.push("/login")}>로그인</button>
    </>
  );
};

export default HomeView;
