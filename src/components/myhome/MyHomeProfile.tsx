import Image from "next/image";
import React from "react";
import styles from "./MyHomeProfile.module.scss";
import cn from "classnames/bind";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

const cx = cn.bind(styles);

interface MyHomeProfileProps {
  session: Session | null;
}

const MyHomeProfile = (props: MyHomeProfileProps) => {
  const { session } = props;
  const router = useRouter();

  //로그아웃
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  //프로필 편집
  const handleToProfileEdit = () => {
    router.push("/accounts/edit");
  };

  return (
    <div className={cx("ProfileWrapper")}>
      <div
        className={cx("ProfileImage")}
        style={{
          backgroundImage: `url(${session?.user.image})`,
        }}
      />

      <div className={cx("ProfileMemo")}>
        <div className={cx("ProfileMemoTitle")}>
          <h1> Hello it’s {session?.user.nickName}</h1>
          <div className={cx("ProfileMemoIconWrapper")}>
            <div className={cx("ProfileMemoIcon")}>
              <div
                className={cx("ProfileMemoIconBottom")}
                onClick={() => handleSignOut()}
              >
                로그아웃
              </div>
            </div>
            <div className={cx("ProfileMemoIcon")}>
              <div className={cx("ProfileMemoIconTop")}>0</div>
              <div className={cx("ProfileMemoIconBottom")}>게시물</div>
            </div>
            <div className={cx("ProfileMemoIcon")}>
              <div className={cx("ProfileMemoIconTop")}>10</div>
              <div className={cx("ProfileMemoIconBottom")}>북마크</div>
            </div>
            <div className={cx("ProfileMemoIcon")}>
              <div className={cx("ProfileMemoIconTop")}>11</div>
              <div className={cx("ProfileMemoIconBottom")}>즐겨찾기</div>
            </div>

            {/* <div className={cx("ProfileMemoIcon")}>
            <div className={cx("ProfileMemoIconTop")}>
              <Image
                src="/static/images/pentagram.svg"
                width={24}
                height={30}
                alt="즐겨찾기"
                style={{ display: "block" }}
              />
            </div>
            <div className={cx("ProfileMemoIconBottom")}>즐겨찾기</div>
          </div> */}
          </div>
        </div>
        <div className={cx("ProfileMemoContent")}>
          {session?.user.profileMemo ?? "프로필 메모 초기"}
        </div>
        <Image
          src="/static/images/tool_tip.svg"
          alt="말풍선 팁"
          width={24}
          height={32}
          className={cx("Tooltip")}
        />
        <div
          className={cx("editProfileBox")}
          onClick={() => handleToProfileEdit()}
        >
          <Image
            src="/static/images/pencil_simple.svg"
            alt="프로필 편집"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default MyHomeProfile;
