"use client";

import { useState } from "react";
import { resolveMediaUrl } from "@/app/lib/backendOrigin";
import { postAdminCancel, postAdminComplete } from "@/app/lib/postApi";
import { PostHeader } from "../types/contract";

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
        ? "이 분양 건을 완료 처리할까요?"
        : "관리자 권한으로 분양을 취소 처리할까요?";
    if (!confirm(msg)) return;
    setBusy(true);
    try {
      if (action === "complete") await postAdminComplete(post.postId);
      else await postAdminCancel(post.postId);
      alert("처리되었습니다.");
      await onRefresh?.();
    } catch (e) {
      alert(e instanceof Error ? e.message : "요청에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="border p-4 rounded-xl bg-white shadow">
      <div className="flex flex-wrap gap-4 justify-between items-start">
        <div className="flex gap-4">
          <img
            src={resolveMediaUrl(post.imageUrl)}
            alt=""
            className="w-32 h-32 object-cover rounded"
          />
          <div className="space-y-1 text-sm">
            <div className="text-xs text-gray-500">게시글 #{post.postId}</div>
            <div>분양자: {post.sellerUsername}</div>
            <div>주소: {post.sellerAddress1}</div>
            <div>품종: {post.breed}</div>
            <div>성별: {post.gender}</div>
            <div>출생일: {post.birthDate}</div>
            <div>분양가: {post.price}원</div>
            <div>건강: {post.healthStatus}</div>
            <div>게시 상태: {post.adoptionStatus}</div>
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[200px]">
          <div className="text-xs font-bold text-gray-600">관리자 처리</div>
          <button
            type="button"
            disabled={busy}
            onClick={() => run("complete")}
            className="rounded-full px-4 py-2 text-sm font-bold text-white shadow bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50"
            style={{ boxShadow: "0 6px 16px rgba(16,185,129,0.25)" }}
          >
            분양 완료
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => run("cancel")}
            className="rounded-full px-4 py-2 text-sm font-bold text-white shadow bg-rose-500 hover:bg-rose-600 disabled:opacity-50"
            style={{ boxShadow: "0 6px 16px rgba(244,63,94,0.25)" }}
          >
            관리자 취소
          </button>
        </div>
      </div>
    </div>
  );
}
