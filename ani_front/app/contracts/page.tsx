"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "../components/PageContainer";
import { resolveMediaUrl } from "../lib/backendOrigin";
import { fetchContractPosts } from "./types/contractsApi";
import type { ContractPostSummary, ContractPostsResponse } from "./types/contract";
import "./contracts.css";

function statusLabel(status: string) {
  if (status === "A") return "진행 중";
  if (status === "P") return "입양 완료";
  if (status === "C") return "취소";
  if (status === "Y") return "분양 완료";
  return status || "-";
}

export default function ContractsPage() {
  const router = useRouter();
  const [status, setStatus] = useState("A");
  const [posts, setPosts] = useState<ContractPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  async function loadData(nextStatus: string) {
    setStatus(nextStatus);
    setLoading(true);
    setError(null);
    try {
      const res: ContractPostsResponse = await fetchContractPosts(nextStatus);
      setPosts(Array.isArray(res.posts) ? res.posts : []);
    } catch {
      setPosts([]);
      setError("계약 관리 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const admin = typeof window !== "undefined" && localStorage.getItem("isAdmin") === "true";
    if (!admin) {
      alert("관리자만 접근할 수 있습니다.");
      router.replace("/");
      return;
    }
    setAuthorized(true);
    loadData("A");
  }, [router]);

  return (
    <PageContainer title="계약 관리" subtitle="분양글별 계약 현황을 확인하고 상세 계약으로 이동할 수 있어요">
      <div className="contract-page-shell">
        {!authorized ? null : (
          <>
            <div className="contract-toolbar">
              <div className="contract-toolbar-left">
                <select value={status} onChange={(e) => loadData(e.target.value)} className="contract-select">
                  <option value="A">진행 중 계약</option>
                  <option value="P">완료 계약</option>
                  <option value="C">취소 계약</option>
                </select>
                <button type="button" onClick={() => loadData(status)} className="contract-refresh-btn">
                  새로고침
                </button>
              </div>

              <Link href="/" className="contract-home-btn">
                홈으로
              </Link>
            </div>

            {error && <div className="contract-message contract-message-error">{error}</div>}

            {loading ? (
              <div className="contract-message">계약 목록을 불러오는 중입니다.</div>
            ) : posts.length === 0 ? (
              <div className="contract-message">조건에 맞는 계약이 없습니다.</div>
            ) : (
              <div className="contract-card-grid">
                {posts.map((post) => (
                  <button
                    key={post.postId}
                    type="button"
                    onClick={() => router.push(`/contracts/${post.postId}`)}
                    className="contract-post-card"
                  >
                    <div className="contract-post-card-image-wrap">
                      <img
                        src={resolveMediaUrl(post.imageUrl)}
                        alt={post.breed}
                        className="contract-post-card-image"
                      />
                    </div>

                    <div className="contract-post-card-body">
                      <div className="contract-post-card-id">Post #{post.postId}</div>
                      <div className="contract-post-card-title">
                        {post.categoryName} / {post.breed}
                      </div>
                      <div className="contract-post-card-meta">등록자 {post.sellerUsername}</div>
                      <div className="contract-post-card-status">{statusLabel(post.adoptionStatus)}</div>

                      <div className="contract-post-card-stats">
                        <div className="contract-post-card-stat">
                          <span>전체 계약</span>
                          <strong>{post.contractCount}건</strong>
                        </div>
                        <div className="contract-post-card-stat">
                          <span>진행 중</span>
                          <strong>{post.activeCount}건</strong>
                        </div>
                        <div className="contract-post-card-stat">
                          <span>완료</span>
                          <strong>{post.pendingCount}건</strong>
                        </div>
                        <div className="contract-post-card-stat">
                          <span>취소</span>
                          <strong>{post.cancelledCount}건</strong>
                        </div>
                      </div>

                      <div className="contract-post-card-footer">
                        <div>{Number(post.price || 0).toLocaleString()}원</div>
                        <div>최근 계약 ID {post.latestContractId ?? "-"}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
