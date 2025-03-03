import React from "react";
import styles from "./CommonLayout.module.scss";
import StickyNav from "components/navigation/StickyNav";
import cn from "classnames/bind";

const cx = cn.bind(styles);

//헤더, 메인, 푸터 구성
interface CommonLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  type?: "common" | "search" | "stack";
}

const CommonLayout = (props: React.PropsWithChildren<CommonLayoutProps>) => {
  const { children, type, header } = props;
  return (
    <div className={cx("Layout")}>
      <StickyNav />
      <main className={cx("MainContent")}>{children}</main>
    </div>
  );
};

export default CommonLayout;
