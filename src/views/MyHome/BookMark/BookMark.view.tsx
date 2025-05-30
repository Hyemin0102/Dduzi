"use client";

import Image from "next/image";
import React from "react";
import styles from "./BookMark.view.module.scss";
import cn from "classnames/bind";
import MyhomeLayout from "layouts/MyHomeLayout";

const cx = cn.bind(styles);

const BookMarkView = () => {
  const temp_bookmark = {
    type: "post",
    result: [
      {
        id: 1,
        content: "내가 만든 뜨개~~",
        design: {
          text: "도안 정보",
          images: ["도안 이미지1", "도안 이미지2"],
        },
        supplies: {
          text: "재료 정보",
          images: ["재료 이미지1", "재료 이미지2"],
        },
        images: ["/static/images/post_1.jpg"],
        logMemo: [
          {
            date: "2025.05.30",
            text: "오늘은 7단까지 떴음!",
          },
        ],
      },
      {
        id: 2,
        content: "내가 만든 뜨개~~",
        design: {
          text: "도안 정보",
          images: ["도안 이미지1", "도안 이미지2"],
        },
        supplies: {
          text: "재료 정보",
          images: ["재료 이미지1", "재료 이미지2"],
        },
        images: ["/static/images/post_2.jpg"],
        logMemo: [
          {
            date: "2025.05.30",
            text: "오늘은 7단까지 떴음!",
          },
        ],
      },
      {
        id: 3,
        content: "내가 만든 뜨개~~",
        design: {
          text: "도안 정보",
          images: ["도안 이미지1", "도안 이미지2"],
        },
        supplies: {
          text: "재료 정보",
          images: ["재료 이미지1", "재료 이미지2"],
        },
        images: ["/static/images/post_3.jpg"],
        logMemo: [
          {
            date: "2025.05.30",
            text: "오늘은 7단까지 떴음!",
          },
        ],
      },
      {
        id: 4,
        content: "내가 만든 뜨개~~",
        design: {
          text: "도안 정보",
          images: ["도안 이미지1", "도안 이미지2"],
        },
        supplies: {
          text: "재료 정보",
          images: ["재료 이미지1", "재료 이미지2"],
        },
        images: ["/static/images/post_1.jpg"],
        logMemo: [
          {
            date: "2025.05.30",
            text: "오늘은 7단까지 떴음!",
          },
        ],
      },
      {
        id: 5,
        content: "내가 만든 뜨개~~",
        design: {
          text: "도안 정보",
          images: ["도안 이미지1", "도안 이미지2"],
        },
        supplies: {
          text: "재료 정보",
          images: ["재료 이미지1", "재료 이미지2"],
        },
        images: ["/static/images/post_2.jpg"],
        logMemo: [
          {
            date: "2025.05.30",
            text: "오늘은 7단까지 떴음!",
          },
        ],
      },
      {
        id: 6,
        content: "내가 만든 뜨개~~",
        design: {
          text: "도안 정보",
          images: ["도안 이미지1", "도안 이미지2"],
        },
        supplies: {
          text: "재료 정보",
          images: ["재료 이미지1", "재료 이미지2"],
        },
        images: ["/static/images/post_3.jpg"],
        logMemo: [
          {
            date: "2025.05.30",
            text: "오늘은 7단까지 떴음!",
          },
        ],
      },
    ],
  };

  return (
    <MyhomeLayout currentTab="bookmark">
      {temp_bookmark.result?.map((item: any, index: any) => (
        <Image
          key={index}
          src={item.images[0]}
          width={100}
          height={100}
          alt={item.id}
          className={cx("Image")}
        />
      ))}
    </MyhomeLayout>
  );
};

export default BookMarkView;
