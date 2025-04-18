"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./Login.view.module.scss";
import { signIn } from "next-auth/react";

const cx = cn.bind(styles);

const LoginView = () => {
  const handleLogin = (type: string) => {
    signIn(type, { callbackUrl: "/" });
  };
  return (
    <div className={cx("LoginBoxWrapper")}>
      <div onClick={() => handleLogin("kakao")} className={cx("LoginBox")}>
        카카오 로그인 하기
      </div>
      <div className={cx("LoginBox")}>구글 로그인 하기</div>
    </div>
  );
};

export default LoginView;
