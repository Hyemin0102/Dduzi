import React, { useState } from "react";
import styles from "./MyHomeContents.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);
const MyHomeContents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [kycCertificationInfo, setKycCertificationInfo] = useState<any[]>();

  const temp_post = [
    {
      label: "게시물",
    },
  ];
  const temp_bookmark = [
    {
      label: "북마크",
    },
  ];
  const temp_favorite = [
    {
      label: "즐겨찾기",
    },
  ];

  const handleNavigationClick = (index: number) => {
    setActiveIndex(index);
    switch (index) {
      case 0:
        setKycCertificationInfo(temp_post);
        break;
      case 1:
        setKycCertificationInfo(temp_bookmark);
        break;
      case 2:
        setKycCertificationInfo(temp_favorite);
        break;
    }
  };

  const headerList = ["뜨개일지", "저장일지", "즐겨찾는 뜨친"];

  return (
    <div className={cx("Wrapper")}>
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
      {kycCertificationInfo &&
        kycCertificationInfo?.map((item, index) => (
          <div key={index}>{item.label}</div>
        ))}
    </div>
  );
};

export default MyHomeContents;
