import React from "react";
import cn from "classnames/bind";
import styles from "./Login.module.scss";
import { signIn } from "next-auth/react";

const cx = cn.bind(styles);

const Login = () => {
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 클릭 ");
    signIn("kakao");
  };

  return (
    <div className={cx("LoginBoxWrapper")}>
      <div onClick={() => signIn("kakao")} className={cx("LoginBox")}>
        카카오 로그인 하기
      </div>
      <div className={cx("LoginBox")}>페이스북 로그인 하기</div>
      <div className={cx("LoginBox")}>구글 로그인 하기</div>
    </div>
  );
};

export default Login;
