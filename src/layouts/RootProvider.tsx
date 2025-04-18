"use client";
import React from "react";
import { RecoilRoot } from "recoil";

const RootProvider = (props: React.PropsWithChildren) => {
  const { children } = props;
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RootProvider;
