import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./UpdatePostModal.module.scss";
import cn from "classnames/bind";
import { useSession } from "next-auth/react";

const cx = cn.bind(styles);

interface UpdatePostModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const initialPostData = {
  image: "https://picsum.photos/id/54/200/200",
  content: "작품 설명",
  design: {
    text: "도안 정보",
    images: "",
  },
  supplies: {
    text: "재료 정보",
    images: "",
  },
  logMemo: "오늘은 2단까지 떴다!!",
};

const UpdatePostModal = ({ isOpen, setIsOpen }: UpdatePostModalProps) => {
  const { data: session } = useSession();
  const [postData, setPostData] = useState(initialPostData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //TODO 모달 오픈 -> 오른쪽 사진 영역, 왼쪽 입력 영역 -> 저장하면 DB저장
  //설명(텍스트), 도안(배열형태)(텍스트, 이미지), 재료(배열형태)(텍스트, 이미지)), 로그(텍스트)

  console.log("포스트", postData);

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsOpen]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  //게시물 저장
  const handleSavePost = async () => {
    if (!session?.user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!postData.image) {
      alert("사진을 업로드해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...postData,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        alert("게시물이 성공적으로 저장되었습니다.");
        setPostData(initialPostData); //게시물 초기화
        setIsOpen(false); //모달 닫기
      } else {
        const error = await response.json();
        throw new Error(error.message || "게시물 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 저장 오류:", error);
      alert("게시물을 저장하는 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className={cx("Overlay")}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={cx("ModalWrapper")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={cx("CloseButton")}
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button className={cx("SaveButton")} onClick={handleSavePost}>
              Save
            </button>
            <div className={cx("ModalContent")}>
              <div className={cx("ImageUploadWrapper")}>
                <div className={cx("Label")}>사진</div>
                <div className={cx("ImageContent")}>사진 여기 업로드</div>
              </div>
              <div className={cx("TextWrapper")}>
                <div className={cx("Label")}>설명</div>
                <div className={cx("TextContent")}>설명 작성</div>
              </div>
              <div className={cx("InputWrapper")}>
                <div className={cx("Label")}>도안</div>
                <div className={cx("Input")}>도안 여기다 업로드하세요</div>
              </div>
              <div className={cx("InputWrapper")}>
                <div className={cx("Label")}>재료</div>
                <div className={cx("Input")}>재료 여기다 업로드하세요</div>
              </div>
              <div className={cx("InputWrapper")}>
                <div className={cx("Label")}>기록</div>
                <div className={cx("Input")}>기록 여기다 업로드하세요</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatePostModal;
