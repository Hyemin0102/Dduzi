"use client";
import { FormEvent, useState } from "react";

import styles from "./NicknameSetupForm.module.scss";
import cn from "classnames/bind";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const cx = cn.bind(styles);

interface NicknameSetupFormProps {}

const NicknameSetupForm = (props: NicknameSetupFormProps) => {
  const { update } = useSession();
  const [nickname, setNickname] = useState(""); //입력하는 닉네임
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    setIsLoading(true);

    try {
      // 닉네임 업데이트 API 호출
      const response = await fetch("/api/user/set-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname }),
      });

      // 응답을 텍스트로 가져와서 분석
      console.log("응답", response);

      const responseText = await response.text();
      console.log("응답 텍스트:", responseText);
      if (response.ok) {
        await update({
          user: { nickName: nickname },
        });
        alert("닉네임이 성공적으로 설정되었습니다.");
        router.push("/");
      }
    } catch (error) {
      console.error("닉네임 설정 오류:", error);
      alert("닉네임 설정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cx("NicknameForm")}>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임을 입력하세요"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "처리 중..." : "설정 완료"}
      </button>
    </form>
  );
};

export default NicknameSetupForm;
