"use client";

import Image from "next/image";
import React from "react";
import styles from "./Favorite.view.module.scss";
import cn from "classnames/bind";
import MyhomeLayout from "layouts/MyHomeLayout";

const cx = cn.bind(styles);

const FavoriteView = () => {
  return (
    <MyhomeLayout currentTab="favorite">
      <div>즐겨찾기 목록</div>
    </MyhomeLayout>
  );
};

export default FavoriteView;
