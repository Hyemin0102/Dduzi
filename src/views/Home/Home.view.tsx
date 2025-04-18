"use client";
import React from "react";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "constants/route.constant";

const cx = cn.bind(styles);

const HomeView = () => {
  const { data, status } = useSession();
  const router = useRouter();
  console.log("data", data);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <div>{data?.user.name} 님 환영합니다!!</div>
      <button onClick={() => handleLogout()}>로그아웃</button>
    </>
  );
};

export default HomeView;
