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
    { id: "home", label: "홈", path: "/", icon: "🏠" },
    { id: "explore", label: "탐색", path: ROUTES.EXPLORE, icon: "🧭" },
    { id: "mypage", label: "마이페이지", path: ROUTES.MYPAGE, icon: "👤" },
  ];

  return (
    <nav className={cx("StickyNav")}>
      <div className={styles.logo}>
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
          <li key={item.id} className={cx("NavItem")}>
            <Link
              href={item.path}
              className={cx("Label", pathname === item.path && "active")}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StickyNav;
