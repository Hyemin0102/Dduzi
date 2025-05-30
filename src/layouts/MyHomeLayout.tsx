"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./MyHomeLayout.module.scss";
import cn from "classnames/bind";
import MyHomeProfile from "components/myhome/MyHomeProfile";
import { useSession } from "next-auth/react";

const cx = cn.bind(styles);

interface MyhomeLayoutPorps {
  currentTab: string;
  children: React.ReactNode;
}

const MyhomeLayout = ({ currentTab, children }: MyhomeLayoutPorps) => {
  const router = useRouter();
  const headerList = ["뜨개일지", "저장일지", "즐겨찾는 뜨친"];
  const { data: session, status } = useSession();

  const getActiveIndex = () => {
    switch (currentTab) {
      case "post":
        return 0;
      case "bookmark":
        return 1;
      case "favorite":
        return 2;
      default:
        return 0;
    }
  };

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());

  const handleNavigationClick = (index: number) => {
    setActiveIndex(index);

    switch (index) {
      case 0:
        router.push("/니니월드");
        break;
      case 1:
        router.push("/니니월드/bookmark");
        break;
      case 2:
        router.push("/니니월드/favorite");
        break;
    }
  };

  useEffect(() => {
    setActiveIndex(getActiveIndex());
  }, [currentTab]);

  return (
    <div className={cx("Wrapper")}>
      <MyHomeProfile session={session} />
      <div>
        {/** 네비게이션 바 */}
        <div className={cx("NavigationBar")}>
          <div className={cx("borderLine")} />
          {headerList.map((label, index) => (
            <div
              key={index}
              className={cx("NavigationButton", {
                active: activeIndex === index,
              })}
              onClick={() => handleNavigationClick(index)}
            >
              {label}
            </div>
          ))}
        </div>
        <div className={cx("ContentWrapper")}>{children}</div>
      </div>
    </div>
  );
};

export default MyhomeLayout;
