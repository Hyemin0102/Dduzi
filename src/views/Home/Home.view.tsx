"use client";
import React, { useState } from "react";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "constants/route.constant";
import { log } from "node:console";

const cx = cn.bind(styles);

const HomeView = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log("session", session);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  //카카오 로그인 연결 해제(현재 카카오 이메일 제공안돼서 로그인 불가)
  const handleKakaoUnLink = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/kakao-unlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "연결 해제 중 오류가 발생했습니다");
      }

      //로그아웃 처리까지
      await signOut({ callbackUrl: "/login" });

      alert("카카오 계정 연결이 해제되었습니다.");
    } catch (error) {
      console.error("카카오 연결 해제 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{session?.user.email} 님 환영합니다!!</div>
      <button onClick={() => handleLogout()}>로그아웃</button>
      <button onClick={() => handleLogout()}>연결 끊기</button>
      {isLoading ? "처리 중..." : "카카오 계정 연결 해제"}
    </div>
  );
};

export default HomeView;
