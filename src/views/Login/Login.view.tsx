"use client";
import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./Login.view.module.scss";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const cx = cn.bind(styles);

const LoginView = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  console.log("로그인 세션", session);

  //이미 로그인 상태면 개인페이지로 이동
  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.nickName) {
        router.push(`/${session.user.nickName}`);
      } else {
        router.push("/accounts/set-nickname");
      }
    }
  }, [session, status, router]);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    //콜백url에 설정한 닉네임 붙혀서 구분
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
    <div className={cx("Wrapper")}>
      <div className={cx("onBoardingWrapper")}>
        <div className={cx("onBoardingText")}>
          <h1>뜨지에 오신걸 환영합니다 ;)</h1>
          <p>
            뜨지에서 작품을 자랑하고 조용하게 소통해요. <br></br>오늘은 뭐 뜨지?
          </p>
          <Image
            src="/static/images/tool_tip.svg"
            alt="말풍선 팁"
            width={24}
            height={32}
            className={cx("Tooltip")}
          />
        </div>
        <div className={cx("onBoardingImage")}>
          <Image
            src="/static/images/main_dduzi.svg"
            alt="뜨지 캐릭터"
            width={230}
            height={400}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
            }}
          />
        </div>
      </div>
      <div className={cx("LoginBoxWrapper")}>
        <div className={cx("LoginText")}>간편로그인</div>
        <div className={cx("LoginButtonWrapper")}>
          <div
            onClick={() => handleSocialLogin("kakao")}
            className={cx("LoginBox")}
          >
            <Image
              src="/static/images/kakao_icon.png"
              width={32}
              height={32}
              alt="카카오 아이콘"
            />
            카카오 로그인 하기
          </div>
          <div
            onClick={() => handleSocialLogin("naver")}
            className={cx("LoginBox")}
          >
            <Image
              src="/static/images/naver_icon.png"
              width={32}
              height={32}
              alt="네이버 아이콘"
            />
            네이버 로그인 하기
          </div>
          <div
            onClick={() => handleSocialLogin("google")}
            className={cx("LoginBox")}
          >
            <Image
              src="/static/images/google_icon.png"
              width={32}
              height={32}
              alt="구글 아이콘"
            />
            구글 로그인 하기
          </div>
        </div>
        <div className={cx("LoginText")}>둘러보기</div>
      </div>
    </div>
  );
};

export default LoginView;
