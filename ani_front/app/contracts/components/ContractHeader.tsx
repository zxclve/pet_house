"use client";

import { useState } from "react";
import { resolveMediaUrl } from "@/app/lib/backendOrigin";
import { postAdminCancel, postAdminComplete } from "@/app/lib/postApi";
import { PostHeader } from "../types/contract";
import "../contracts.css";

function adoptionStatusLabel(status: string) {
  if (status === "A") return "진행 중";
  if (status === "Y" || status === "P") return "완료";
  if (status === "C") return "취소";
  return status || "-";
}

export default function ContractHeader({
  post,
  onRefresh,
}: {
  post: PostHeader;
  onRefresh?: () => void | Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  async function run(action: "complete" | "cancel") {
    if (busy) return;
    const msg =
      action === "complete"
        ? "이 분양글을 입양 완료 처리할까요?"
        : "이 분양글을 관리자 권한으로 취소 처리할까요?";
    if (!confirm(msg)) return;

    setBusy(true);
    try {
      if (action === "complete") await postAdminComplete(post.postId);
      else await postAdminCancel(post.postId);
      alert("처리가 완료되었습니다.");
      await onRefresh?.();
    } catch (e) {
      alert(e instanceof Error ? e.message : "요청 처리에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="contract-header-card">
      <div className="contract-header-main">
        <img src={resolveMediaUrl(post.imageUrl)} alt={post.breed} className="contract-header-image" />

        <div className="contract-header-content">
          <div className="contract-header-top">
            <div>
              <div className="contract-header-id">Post #{post.postId}</div>
              <div className="contract-header-title">
                {post.categoryName ?? "반려동물"} / {post.breed}
              </div>
              <div className="contract-header-owner">등록자 {post.sellerUsername}</div>
            </div>
            <div className="contract-header-status">{adoptionStatusLabel(post.adoptionStatus)}</div>
          </div>

          <div className="contract-header-info-grid">
            <div className="contract-header-info-box">
              <span>성별</span>
              <strong>{post.gender || "-"}</strong>
            </div>
            <div className="contract-header-info-box">
              <span>출생일</span>
              <strong>{post.birthDate || "-"}</strong>
            </div>
            <div className="contract-header-info-box">
              <span>분양가</span>
              <strong>{Number(post.price || 0).toLocaleString()}원</strong>
            </div>
            <div className="contract-header-info-box">
              <span>주소</span>
              <strong>{post.sellerAddress1 || "-"}</strong>
            </div>
          </div>

          <div className="contract-header-notes">
            <div>
              <span>특징</span>
              <p>{post.colorFeatures || "등록된 특징 정보가 없습니다."}</p>
            </div>
            <div>
              <span>건강 상태</span>
              <p>{post.healthStatus || "등록된 건강 정보가 없습니다."}</p>
            </div>
          </div>

          <div className="contract-header-actions">
            <button type="button" disabled={busy} onClick={() => run("complete")} className="contract-complete-btn">
              분양 완료
            </button>
            <button type="button" disabled={busy} onClick={() => run("cancel")} className="contract-cancel-btn">
              관리자 취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
