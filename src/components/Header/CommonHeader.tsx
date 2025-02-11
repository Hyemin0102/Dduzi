import { ROUTES } from "@/constants/route.constant";
import Link from "next/link";
import React from "react";
import styles from "./CommonHeader.module.scss";

const CommonHeader = () => {
  const headerMenu = [
    {
      text: "탐색",
      link: ROUTES.EXPLORE,
    },
    {
      text: "마이페이지",
      link: ROUTES.MYPAGE,
    },
  ];

  return (
    <header className={styles.HeaderWrapper}>
      <Link href="/" aria-label="홈으로 이동">
        이미지
      </Link>
      <nav className={styles.Navigation}>
        {headerMenu.map((menu) => (
          <Link href={menu.link} key={menu.link}>
            {menu.text}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default CommonHeader;
