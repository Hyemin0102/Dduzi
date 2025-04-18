"use client";
import Link from "next/link";
import React from "react";
import styles from "./StickyNav.module.scss";
import { ROUTES } from "constants/route.constant";
import cn from "classnames/bind";
import { usePathname } from "next/navigation";
import Image from "next/image";

const cx = cn.bind(styles);

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const StickyNav = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "홈",
      path: ROUTES.INDEX,
      icon: "/static/images/house_line.svg",
    },
    {
      id: "explore",
      label: "탐색",
      path: ROUTES.EXPLORE,
      icon: "/static/images/yarn.svg",
    },
    {
      id: "mypage",
      label: "마이페이지",
      path: ROUTES.MYPAGE,
      icon: "/static/images/my_page.svg",
    },
  ];

  return (
    <nav className={cx("StickyNav")}>
      <div className={cx("logo")}>
        <h1>Dduzi</h1>
        <Image
          src={"/static/images/dduzi_logo.png"}
          alt={"뜨지"}
          width={30}
          height={30}
        />
      </div>

      <ul className={cx("NavItems")}>
        {navItems.map((item) => (
          <li
            key={item.id}
            className={cx("NavItem", pathname === item.path && "active")}
          >
            <Image src={item.icon} alt={item.label} width={24} height={24} />
            <Link href={item.path} className={cx("Link")}>
              {item.label}
            </Link>
          </li>
        ))}
        {/* <div className={cx("NavItem")}>
          <Link href={ROUTES.LOGIN} className={cx("Link")}>
            로그인
          </Link>
        </div> */}
      </ul>
    </nav>
  );
};

export default StickyNav;
