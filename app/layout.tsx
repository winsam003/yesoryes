import type { Metadata } from "next";
import "./globals.css"; // CSS 파일이 있다면 임포트
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Yes or Yes 💍',
  description: '하나만 선택해 yes or yes 😏',
  openGraph: {
    title: 'Yes or Yes 💍',
    description: '하나만 선택해 yes or yes 😏',
    // 이미지를 만드셨다면 아래 주석을 해제하세요
    // images: [{ url: '/og-image.png' }], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* page.tsx의 내용이 여기에 들어갑니다 */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}