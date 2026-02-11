'use client';

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function RunawayButtonPage() {
  const [noBtnPos, setNoBtnPos] = useState({ top: '50%', left: 'calc(50% + 80px)' });
  const [yesBtnScale, setYesBtnScale] = useState(1);
  const [noBtnText, setNoBtnText] = useState("아니오");
  const containerRef = useRef<HTMLDivElement>(null);

  const trollMessages = ["어딜?", "못 누르지?", "정말?", "진심이야?", "다시 생각해봐", "까비!"];

  const moveButton = (e: React.MouseEvent | React.TouchEvent) => {
    // 모바일에서 터치 시 스크롤되거나 클릭되는 기본 동작 방지
    if ('touches' in e) {
      // e.preventDefault(); // 필요 시 활성화 (버튼 클릭 방지용)
    }

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

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-50 overflow-hidden p-4">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-extrabold mb-12 text-slate-900 text-center"
      >
        나랑 오늘 맛있는 거 먹으러 갈래? 🍕
      </motion.h1>

      <div
        ref={containerRef}
        className="relative w-full max-w-2xl h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center bg-white shadow-inner"
      >
        <motion.div animate={{ scale: yesBtnScale }}>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 text-xl font-bold transition-all shadow-lg"
            onClick={() => {
              alert('나도좋아 !!!! 💞💞💞💞\n지금 바로 맛집 찾아보자!');
              // 네이버 '내 주변 맛집' 검색 결과로 리다이렉트
              window.location.href = "https://search.naver.com/search.naver?query=내주변+맛집";
            }}
          >
            예!
          </Button>
        </motion.div>

        {/* 모바일 대응: onTouchStart 추가 */}
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
            onTouchStart={moveButton} // 터치 시작하자마자 도망감
            onClick={(e) => {
              e.preventDefault();
              moveButton(e);
            }}
          >
            {noBtnText}
          </Button>
        </motion.div>
      </div>

      <p className="mt-8 text-slate-400 text-sm italic">
        * Yes or Yes
      </p>
    </main>
  );
}