"use client";

import "./registration.css";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "../components/PageContainer";

export default function AdoptPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null!);
    return (
        <PageContainer
            title="분양 등록"
            subtitle="새로운 반려동물 정보를 등록해보세요"
        >
            <div className="w-[90%] max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    반려동물 분양 등록
                </h1>

                <div className="space-y-4 border-2 border-red-300 p-6 rounded-lg shadow">
                    <div>
                        <label className="block mb-2 text-lg font-bold text-center">
                            반려동물 이미지
                        </label>

                        <div className="mt-4 w-full h-64 border-2 border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
                            <span className="text-sm text-gray-400">이미지 업로드 영역</span>
                        </div>
                        <div className="image-upload-row">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />

                            <button
                                type="button"
                                className="image-upload-btn"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                이미지 등록
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">동물 종류</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 강아지 / 고양이"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">품종</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="품종 입력"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">성별</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 수컷 / 암컷"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">출생일</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded bg-white h-10"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">모색 및 특징</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 갈색, 활발함"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">건강상태</label>
                        <textarea
                            className="w-full border p-2 rounded bg-white min-h-[80px]"
                            placeholder="건강 상태를 입력하세요"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">분양가</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 300000"
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            alert("등록 완료되었습니다.");
                            router.push("/");
                        }}
                        className="px-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        등록하기
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </PageContainer>
    );
}