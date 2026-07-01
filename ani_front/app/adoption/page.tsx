"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mapPostToPetItem, fetchPostDetail, postApply } from "../lib/postApi";
import type { PostSiteDto } from "../lib/postTypes";

import "./adoption.css";
import PageContainer from "../components/PageContainer";

function statusLabel(code: string | undefined) {
  if (code === "C") return "취소";
  if (code === "Y") return "완료";
  return "신청";
}

function AdoptionDetailInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const petId = Number(searchParams.get("id") || "0");

  const [post, setPost] = useState<PostSiteDto | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!petId) {
      setLoadError("잘못된 링크입니다.");
      setPost(null);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadError(null);
      try {
        const dto = await fetchPostDetail(petId);
        if (!cancelled) setPost(dto);
      } catch (e) {
        if (!cancelled) {
          setPost(null);
          setLoadError(e instanceof Error ? e.message : "불러오기 실패");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [petId]);

  const pet = useMemo(() => (post ? mapPostToPetItem(post) : null), [post]);
  const status = statusLabel(post?.status);

  const statusList = [
    { name: "신청", bg: "bg-orange-100", text: "text-orange-600", dot: "bg-orange-500" },
    { name: "취소", bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
    { name: "완료", bg: "bg-green-100", text: "text-green-600", dot: "bg-green-500" },
  ];

  async function handleApply() {
    setActionMsg(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    if (!petId) return;
    try {
      await postApply(petId);
      alert("입양 신청이 접수되었습니다.");
      const dto = await fetchPostDetail(petId);
      setPost(dto);
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : "신청 실패");
    }
  }

  if (loadError && !post) {
    return (
      <PageContainer title="분양 상세정보">
        <div className="w-[90%] max-w-3xl mx-auto p-6 text-center text-red-600">{loadError}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="분양 상세정보">
      <div className="w-[90%] max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">반려동물 분양 상세정보</h1>

        <div className="space-y-4 border-2 border-red-300 p-6 rounded-lg shadow">
          <div>
            <label className="block mb-2 text-lg font-bold text-center">반려동물 이미지</label>
            <div className="mt-4 w-full h-64 border-2 border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
              {pet?.img ? (
                <img src={pet.img} alt={pet.name} className="w-full h-full object-contain rounded-md" />
              ) : (
                <span className="text-sm text-gray-400">이미지 영역</span>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">동물 종류</label>
            <div className="w-full border p-2 rounded bg-gray-100 h-10">{pet?.type ?? "-"}</div>
          </div>

          <div>
            <label className="block mb-1 font-medium">품종</label>
            <div className="w-full border p-2 rounded bg-gray-100 h-10">{pet?.breed ?? "-"}</div>
          </div>

          <div>
            <label className="block mb-1 font-medium">성별</label>
            <div className="w-full border p-2 rounded bg-gray-100 h-10">{pet?.gender ?? "-"}</div>
          </div>

          <div>
            <label className="block mb-1 font-medium">출생일</label>
            <div className="w-full border p-2 rounded bg-gray-100 h-10">{pet?.birthDate ?? pet?.age ?? "-"}</div>
          </div>

          <div>
            <label className="block mb-1 font-medium">모색 및 특징</label>
            <div className="w-full border p-2 rounded bg-gray-100 h-10">{pet?.colorFeatures ?? pet?.tags?.join(", ") ?? "-"}</div>
          </div>

          <div>
            <label className="block mb-1 font-medium">건강상태</label>
            <div className="w-full border p-2 rounded bg-gray-100 min-h-[80px]">{pet?.healthStatus ?? "-"}</div>
          </div>

          <div>
            <label className="block mb-1 font-medium">분양가</label>
            <div className="w-full border p-2 rounded bg-gray-100 h-10">
              {pet?.price != null ? `${Number(pet.price).toLocaleString()}원` : "-"}
            </div>
          </div>

          <div>
            <div className="flex gap-4 justify-end">
              {statusList.map((item) => {
                const isActive = status === item.name;
                return (
                  <span
                    key={item.name}
                    className={`flex items-center gap-2 px-3 py-1 rounded font-medium ${
                      isActive ? `${item.bg} ${item.text}` : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? item.dot : "bg-gray-400"}`}></span>
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {actionMsg && <p className="text-center text-red-600 mt-4 text-sm">{actionMsg}</p>}

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleApply}
            className="px-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            입양신청
          </button>

          <button type="button" onClick={() => router.back()} className="px-6 bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
            목록으로
          </button>
        </div>
      </div>
    </PageContainer>
  );
}

export default function AdoptionDetailPage() {
  return (
    <Suspense
      fallback={
        <PageContainer title="분양 상세정보">
          <div className="p-8 text-center text-gray-500">불러오는 중…</div>
        </PageContainer>
      }
    >
      <AdoptionDetailInner />
    </Suspense>
  );
}
