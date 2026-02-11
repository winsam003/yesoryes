'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MakeLinkPage() {
    const [question, setQuestion] = useState('');
    const [success, setSuccess] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');

    // handleGenerate 함수 내 수정
    const handleGenerate = () => {
        if (!question || !success) {
            alert("질문과 성공 문구를 모두 입력해주세요!");
            return;
        }

        const encode = (str: string) => {
            if (!str) return '';
            // 1. 한글 처리 2. Base64 변환 3. URL 특수문자 처리(핵심)
            return encodeURIComponent(btoa(unescape(encodeURIComponent(str))));
        };

        const qParam = encode(question);
        const sParam = encode(success);
        const rParam = encode(searchQuery);

        const baseUrl = window.location.origin;
        const finalUrl = `${baseUrl}?q=${qParam}&s=${sParam}${rParam ? `&r=${rParam}` : ''}`;

        setGeneratedUrl(finalUrl);
    };

    const copyToClipboard = () => {
        if (!generatedUrl) return;
        navigator.clipboard.writeText(generatedUrl).then(() => {
            alert("링크가 복사되었습니다! 🎣");
        }).catch(() => {
            alert("복사 실패! 직접 드래그해서 복사해주세요.");
        });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-slate-50 p-6 text-slate-900">
            <Card className="w-full max-w-md shadow-2xl border-t-8 border-primary bg-white">
                <CardHeader className="pb-4">
                    <CardTitle className="text-3xl text-center font-black">
                        낚시 링크 생성기 🎣
                    </CardTitle>
                    <p className="text-center text-slate-500 text-sm">상대방을 완벽하게 낚아보세요.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">질문 문구</label>
                        <Input
                            placeholder="예: 나랑 결혼해줄래? 💍"
                            value={question}
                            className="h-12 text-base"
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">성공 메시지 (알럿창)</label>
                        <Input
                            placeholder="예: 평생 행복하게 해줄게! 🥰"
                            value={success}
                            className="h-12 text-base"
                            onChange={(e) => setSuccess(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">네이버 검색어 (선택)</label>
                        <Input
                            placeholder="예: 강남역 맛집 (비워두면 창 닫기)"
                            value={searchQuery}
                            className="h-12 text-base border-dashed"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <p className="text-[11px] text-slate-400 ml-1">* 입력 시 해당 검색 결과로 이동합니다.</p>
                    </div>

                    <Button
                        className="w-full py-7 text-xl font-bold transition-all shadow-lg"
                        onClick={handleGenerate}
                    >
                        마법의 링크 만들기 ✨
                    </Button>

                    {generatedUrl && (
                        <div className="mt-8 p-5 bg-blue-50 rounded-2xl border-2 border-blue-100 animate-in zoom-in-95 duration-300">
                            <p className="text-xs font-black text-blue-600 mb-3 uppercase tracking-widest text-center">링크가 생성되었습니다!</p>
                            <div className="flex flex-col gap-3">
                                <Input
                                    value={generatedUrl}
                                    readOnly
                                    className="bg-white border-blue-200 text-blue-800 font-mono text-xs"
                                />
                                <Button
                                    variant="secondary"
                                    className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold"
                                    onClick={copyToClipboard}
                                >
                                    주소 복사하기
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}