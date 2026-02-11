import type { Metadata } from "next";
import "./globals.css"; // CSS 파일이 있다면 임포트

export const metadata: Metadata = {
  title: '나랑 오늘 맛있는 거 먹으러 갈래? 🍕',
  description: 'yes or yes. 💍',
  openGraph: {
    title: '나랑 오늘 맛있는 거 먹으러 갈래? 🍕',
    description: 'yes or yes 😏',
    // 아까 생성한 이미지를 public 폴더에 넣었다면 아래 주소를 활용하세요
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
      </body>
    </html>
  );
}