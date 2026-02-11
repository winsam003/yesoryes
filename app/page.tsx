'use client';

import React, { useState, useRef, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';

function RunawayContent() {
  const searchParams = useSearchParams();

  // Base64 해독 함수 (더 견고한 버전)
  const decodeBase64 = (str: string | null) => {
    if (!str) return null;
    try {
      // 1. URL 전달 과정에서 공백이 '+'로 바뀌거나 유실된 경우를 대비해 보정
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');

      // 2. 패딩(=)이 부족할 경우 자동으로 채워줌
      const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');

      // 3. 복호화 실행
      return decodeURIComponent(escape(atob(paddedBase64)));
    } catch (e) {
      console.error("복호화 실패 (형식이 잘못됨):", e);
      return null;
    }
  };

  // URL 파라미터 데이터 해독
  const question = decodeBase64(searchParams.get('q')) || "나랑 오늘 맛있는 거 먹으러 갈래? 🍕";
  const successMsg = decodeBase64(searchParams.get('s')) || "나도좋아 !!!! 💞💞💞💞\n지금 바로 맛집 찾아보자!";
  const redirectQuery = decodeBase64(searchParams.get('r')); // 선택된 네이버 검색어

  const [noBtnPos, setNoBtnPos] = useState({ top: '50%', left: 'calc(50% + 80px)' });
  const [yesBtnScale, setYesBtnScale] = useState(1);
  const [noBtnText, setNoBtnText] = useState("아니오");
  const containerRef = useRef<HTMLDivElement>(null);

  const trollMessages = ["어딜?", "못 누르지?", "정말?", "진심이야?", "다시 생각해봐", "까비!"];

  const moveButton = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const maxX = container.clientWidth - 100;
    const maxY = container.clientHeight - 60;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoBtnPos({
      top: `${randomY}px`,
      left: `${randomX}px`,
    });

    setNoBtnText(trollMessages[Math.floor(Math.random() * trollMessages.length)]);
    setYesBtnScale(prev => prev + 0.15);
  };

  const handleYesClick = () => {
    alert(successMsg);

    // 1. 커스텀 검색어(r)가 있는 경우 해당 검색어로 이동
    if (redirectQuery) {
      window.location.href = `https://search.naver.com/search.naver?query=${encodeURIComponent(redirectQuery)}`;
      return;
    }

    // 2. 검색어는 없지만 커스텀 질문(q)인 경우 (낚시 완료)
    if (searchParams.has('q')) {
      try {
        window.close(); // 브라우저 보안에 따라 작동하지 않을 수 있음
        if (!window.closed) {
        }
      } catch (e) {
      }
    } else {
      // 3. 아무 파라미터 없는 기본 페이지인 경우 (기본 맛집 검색)
      window.location.href = "https://search.naver.com/search.naver?query=내주변+맛집";
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-50 overflow-hidden p-4">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-5xl font-extrabold mb-12 text-slate-900 text-center break-keep leading-tight px-4"
      >
        {question}
      </motion.h1>

      <div
        ref={containerRef}
        className="relative w-full max-w-2xl h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center bg-white shadow-inner"
      >
        <motion.div animate={{ scale: yesBtnScale }}>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 text-xl font-bold transition-all shadow-lg"
            onClick={handleYesClick}
          >
            예!
          </Button>
        </motion.div>

        <motion.div
          animate={{ top: noBtnPos.top, left: noBtnPos.left }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute"
          style={{ zIndex: 50 }}
        >
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full px-8 text-lg font-semibold shadow-md touch-none"
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={(e) => {
              e.preventDefault();
              moveButton(e);
            }}
          >
            {noBtnText}
          </Button>
        </motion.div>
      </div>

      <p className="mt-8 text-slate-400 text-sm italic font-medium">
        * Yes or Yes
      </p>
    </main>
  );
}

export default function RunawayButtonPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen font-bold text-slate-500">데이터를 불러오는 중...</div>}>
      <RunawayContent />
    </Suspense>
  );
}