import { atom } from "recoil";

/** 로그인 상태 처리 */
export const loginState = atom({
  key: "loginState",
  default: true,
});
