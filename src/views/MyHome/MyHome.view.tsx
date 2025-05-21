"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./MyHome.view.module.scss";
import cn from "classnames/bind";
import MyHomeProfile from "components/myhome/MyHomeProfile";
import MyHomeContents from "components/myhome/MyHomeContents";
import UpdatePostModal from "components/modal/UpdatePostModal";

const cx = cn.bind(styles);

const MyHomeView = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const decodedPathname = decodeURIComponent(pathname);
  const nickname = decodedPathname.slice(1);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.nickName) {
      // 현재 URL의 닉네임과 로그인한 사용자의 닉네임이 다르면 리다이렉트
      if (!nickname.includes(session.user.nickName)) {
        router.replace(`/${session.user.nickName}`);
      }
    }
  }, [session, status, pathname, router]);

  //게시물 작성
  const handleToPost = () => {
    //게시물 작성하는 모달 오픈
    setIsModalOpen(true);
  };

  return (
    <div className={cx("Wrapper")}>
      <MyHomeProfile session={session} />
      <MyHomeContents />
      <button onClick={handleToPost}>게시물 작성</button>
      <UpdatePostModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default MyHomeView;
