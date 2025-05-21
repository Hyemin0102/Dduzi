export interface PostData {
  /** 사진 url */
  image: string;
  /** 내용 */
  content: string;
  /** 도안 정보 */
  design: {
    text?: string;
    images?: string;
  }[];
  /** 사용 재료 정보 */
  supplies: {
    text?: string;
    image?: string;
  }[];
  /** 로그 기록 */
  logMemo: string[];
}
