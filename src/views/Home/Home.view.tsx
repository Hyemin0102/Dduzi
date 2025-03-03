"use client";
import React from "react";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import Login from "components/login/Login";

const cx = cn.bind(styles);

const HomeView = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default HomeView;
