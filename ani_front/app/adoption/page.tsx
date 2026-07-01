"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchPostDetail, mapPostToPetItem, postApply } from "../lib/postApi";
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
      setLoadError("잘못된 접근입니다.");
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
          setLoadError(e instanceof Error ? e.message : "상세 정보를 불러오지 못했습니다.");
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
    { name: "신청", tone: "is-request" },
    { name: "취소", tone: "is-cancelled" },
    { name: "완료", tone: "is-complete" },
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
      setActionMsg(e instanceof Error ? e.message : "신청 처리에 실패했습니다.");
    }
  }

  if (loadError && !post) {
    return (
      <PageContainer title="분양 상세 정보">
        <div className="adoption-shell adoption-error">{loadError}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="분양 상세 정보" subtitle="반려동물 정보를 확인하고 입양을 신청해보세요">
      <div className="adoption-shell">
        <h1 className="adoption-title">반려동물 분양 상세 정보</h1>

        <section className="adoption-card">
          <div className="adoption-field">
            <label className="adoption-label adoption-image-label">반려동물 이미지</label>
            <div className="adoption-image-frame">
              {pet?.img ? (
                <img src={pet.img} alt={pet.name} className="adoption-image" />
              ) : (
                <span className="adoption-image-placeholder">이미지 준비 중</span>
              )}
            </div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">동물 종류</label>
            <div className="adoption-value">{pet?.type ?? "-"}</div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">품종</label>
            <div className="adoption-value">{pet?.breed ?? "-"}</div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">성별</label>
            <div className="adoption-value">{pet?.gender ?? "-"}</div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">출생일</label>
            <div className="adoption-value">{pet?.birthDate ?? pet?.age ?? "-"}</div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">색상 및 특징</label>
            <div className="adoption-value">{pet?.colorFeatures ?? pet?.tags?.join(", ") ?? "-"}</div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">건강 상태</label>
            <div className="adoption-value adoption-value-multiline">{pet?.healthStatus ?? "-"}</div>
          </div>

          <div className="adoption-field">
            <label className="adoption-label">분양가</label>
            <div className="adoption-value">
              {pet?.price != null ? `${Number(pet.price).toLocaleString()}원` : "-"}
            </div>
          </div>

          <div className="adoption-status-row">
            {statusList.map((item) => {
              const isActive = status === item.name;
              return (
                <span
                  key={item.name}
                  className={`adoption-status-pill ${isActive ? item.tone : "is-inactive"}`}
                >
                  <span className="adoption-status-dot"></span>
                  {item.name}
                </span>
              );
            })}
          </div>
        </section>

        {actionMsg && <p className="adoption-action-message">{actionMsg}</p>}

        <div className="adoption-actions">
          <button type="button" onClick={handleApply} className="adoption-btn adoption-btn-primary">
            입양 신청
          </button>
          <button type="button" onClick={() => router.back()} className="adoption-btn adoption-btn-secondary">
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
        <PageContainer title="분양 상세 정보">
          <div className="adoption-shell adoption-loading">불러오는 중...</div>
        </PageContainer>
      }
    >
      <AdoptionDetailInner />
    </Suspense>
  );
}
