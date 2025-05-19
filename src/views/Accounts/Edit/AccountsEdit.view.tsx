"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "./AccountsEdit.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

const AccountsEditView = () => {
  const { data: session, update } = useSession();
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  console.log("프로필 세션", session);

  useEffect(() => {
    if (session?.user) {
      // 기존 값이 있으면 사용, 없으면 기본값 설정
      setMemo(
        session.user.profileMemo ||
          `안녕하세요. ${session.user.nickName}의 뜨개일지입니다 :)`
      );
    }
  }, [session]);

  const handleBlur = async () => {
    if (!session?.user) return;

    try {
      setIsLoading(true);
      setMessage("");

      const response = await fetch("/api/user/updateProfileMemo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileMemo: memo }),
      });

      const data = await response.json();

      if (response.ok) {
        await update();
      }
    } catch (error) {
      console.error("Profile memo update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>프로필 편집</div>
      <div>
        <div>
          <div
            className={cx("ProfileImage")}
            style={{
              backgroundImage: `url(${session?.user.image})`,
            }}
          />
          <button>사진 변경</button>
        </div>
        <div>
          <div>소개</div>
          <div>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              disabled={isLoading}
              placeholder="자기소개를 입력하세요"
              onBlur={handleBlur}
            />
            {isLoading && <span>저장 중...</span>}
          </div>
        </div>
        <button>저장</button>
      </div>
    </div>
  );
};

export default AccountsEditView;
