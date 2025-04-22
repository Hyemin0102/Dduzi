"use client";
import React from "react";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "constants/route.constant";
import { log } from "node:console";

const cx = cn.bind(styles);

const HomeView = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{session?.user.email} 님 환영합니다!!</div>
      <button onClick={() => handleLogout()}>로그아웃</button>
    </div>
  );
};

export default HomeView;
