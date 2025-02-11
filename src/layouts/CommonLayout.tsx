import CommonHeader from "@/components/Header/CommonHeader";
import React from "react";

//헤더, 메인, 푸터 구성
interface CommonLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  type?: "common" | "search" | "stack";
}

const CommonLayout = (props: React.PropsWithChildren<CommonLayoutProps>) => {
  const { children, type, header } = props;
  return (
    <>
      <header>{header}</header>
      <main>{children}</main>
    </>
  );
};

export default CommonLayout;
