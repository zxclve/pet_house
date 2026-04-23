"use client";

import "./registration.css";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "../components/PageContainer";
import { addCustomPet } from "../lib/petStore";

export default function AdoptPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null!);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [form, setForm] = useState({
        type: "",
        breed: "",
        gender: "",
        birthDate: "",
        colorFeatures: "",
        healthStatus: "",
        price: "",
    });

    const onChangeForm = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const onSubmit = () => {
        if (!form.type || !form.breed || !form.price) {
            alert("동물 종류, 품종, 분양가는 필수입니다.");
            return;
        }

        const id = Date.now();
        addCustomPet({
            id,
            name: `${form.breed} 친구`,
            breed: form.breed,
            age: form.birthDate || "미상",
            type: form.type,
            emoji: "🐾",
            imgClass: "dog",
            tags: ["신규등록"],
            isNew: true,
            liked: false,
            img: previewUrl || "/images/goldenretriever.png",
            healthStatus: form.healthStatus,
            colorFeatures: form.colorFeatures,
            price: Number(form.price),
            gender: form.gender,
            birthDate: form.birthDate,
        });

        alert("등록 완료되었습니다.");
        router.push("/");
    };
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
                            {previewUrl ? (
                                <img src={previewUrl} alt="미리보기" className="w-full h-full object-contain rounded-md" />
                            ) : (
                                <span className="text-sm text-gray-400">이미지 업로드 영역</span>
                            )}
                        </div>
                        <div className="image-upload-row">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={onChangeImage}
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
                            name="type"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 강아지 / 고양이"
                            value={form.type}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">품종</label>
                        <input
                            type="text"
                            name="breed"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="품종 입력"
                            value={form.breed}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">성별</label>
                        <input
                            type="text"
                            name="gender"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 수컷 / 암컷"
                            value={form.gender}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">출생일</label>
                        <input
                            type="date"
                            name="birthDate"
                            className="w-full border p-2 rounded bg-white h-10"
                            value={form.birthDate}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">모색 및 특징</label>
                        <input
                            type="text"
                            name="colorFeatures"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 갈색, 활발함"
                            value={form.colorFeatures}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">건강상태</label>
                        <textarea
                            name="healthStatus"
                            className="w-full border p-2 rounded bg-white min-h-[80px]"
                            placeholder="건강 상태를 입력하세요"
                            value={form.healthStatus}
                            onChange={onChangeForm}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">분양가</label>
                        <input
                            type="text"
                            name="price"
                            className="w-full border p-2 rounded bg-white h-10"
                            placeholder="예: 300000"
                            value={form.price}
                            onChange={onChangeForm}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onSubmit}
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