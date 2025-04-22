import { FormEvent, useState } from "react";

import styles from "./NicknameSetupForm.module.scss";
import cn from "classnames/bind";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

interface NicknameSetupFormProps {
  userId: any;
}

const NicknameSetupForm = (props: NicknameSetupFormProps) => {
  const { userId } = props;
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log("nickname", nickname);
  console.log("userId", userId);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    setIsLoading(true);

    try {
      // 닉네임 업데이트 API 호출
      const response = await fetch("/api/user/update-nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, nickname }),
      });

      if (response.ok) {
        // 업데이트 성공 시 홈으로 리다이렉트
        router.push("/");
      } else {
        const error = await response.json();
        alert(error.message || "닉네임 설정에 실패했습니다.");
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
