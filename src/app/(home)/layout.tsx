import CommonHeader from "@/components/Header/CommonHeader";
import CommonLayout from "@/layouts/CommonLayout";
import React from "react";

const HomeLayout = (props: React.PropsWithChildren) => {
  const { children } = props;
  return <CommonLayout header={<CommonHeader />}>{children}</CommonLayout>;
};

export default HomeLayout;
