"use client";
import { FormEvent, useState } from "react";

import styles from "./NicknameSetupForm.module.scss";
import cn from "classnames/bind";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const cx = cn.bind(styles);

interface NicknameSetupFormProps {}

const ImageList: string[] = [
  "https://picsum.photos/id/10/200/200",
  "https://picsum.photos/id/20/200/200",
  "https://picsum.photos/id/30/200/200",
  "https://picsum.photos/id/40/200/200",
  "https://picsum.photos/id/50/200/200",
  "https://picsum.photos/id/60/200/200",
];

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
      const randomIndex = Math.floor(Math.random() * ImageList.length);
      const randomImage = ImageList[randomIndex];
      // 닉네임 업데이트 API 호출
      const response = await fetch("/api/user/set-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, image: randomImage }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("응답 데이터:", responseData);
        await update();

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
