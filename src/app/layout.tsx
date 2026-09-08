import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/index.scss";

export const metadata: Metadata = {
  title: "뜨지 | 나만의 뜨개 기록",
  description:
    "뜨개 프로젝트를 기록하고, 완성작을 자랑하고, 다른 사람들의 뜨개 이야기를 구경하는 앱, 뜨지입니다.",
};

const Pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "./fonts/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "./fonts/Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
}
