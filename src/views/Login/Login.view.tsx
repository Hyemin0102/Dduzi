"use client";
import React, { useEffect } from "react";
import cn from "classnames/bind";
import styles from "./Login.view.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NicknameSetupForm from "components/login/NicknameSetupForm";

const cx = cn.bind(styles);

const LoginView = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("session", session);

  //1. 첫 가입한 유저는 닉네임 설정
  //2. 재로그인은 바로 홈으로 이동

  useEffect(() => {
    // 로그인된 경우
    if (session?.user?.nickName) {
      router.push("/");
    }
  }, [session, status, router]);

  const handleLogin = (type: string) => {
    signIn(type);
  };
  return session ? (
    <div>
      {session.user.email}계정으로 가입됩니다. 닉네임을 설정해주세요.
      <NicknameSetupForm />
    </div>
  ) : (
    <div className={cx("LoginBoxWrapper")}>
      <div onClick={() => handleLogin("kakao")} className={cx("LoginBox")}>
        카카오 로그인 하기
      </div>
      <div onClick={() => handleLogin("naver")} className={cx("LoginBox")}>
        네이버 로그인 하기
      </div>
      <div onClick={() => handleLogin("google")} className={cx("LoginBox")}>
        구글 로그인 하기
      </div>
    </div>
  );
};

export default LoginView;
