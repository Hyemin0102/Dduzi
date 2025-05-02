"use client";
import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./Login.view.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NicknameSetupForm from "components/login/NicknameSetupForm";

const cx = cn.bind(styles);

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx("LoginBoxWrapper")}>
      <div
        onClick={() => handleSocialLogin("kakao")}
        className={cx("LoginBox")}
      >
        카카오 로그인 하기
      </div>
      <div
        onClick={() => handleSocialLogin("naver")}
        className={cx("LoginBox")}
      >
        네이버 로그인 하기
      </div>
      <div
        onClick={() => handleSocialLogin("google")}
        className={cx("LoginBox")}
      >
        구글 로그인 하기
      </div>
    </div>
  );
};

export default LoginView;
