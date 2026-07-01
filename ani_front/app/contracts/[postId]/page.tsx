"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "../../components/PageContainer";
import ContractHeader from "../components/ContractHeader";
import { fetchContracts } from "../types/contractsApi";
import type { ContractDTO, PostContractResponse } from "../types/contract";
import "../contracts.css";

function contractStatusLabel(status: string) {
  if (status === "A") return "진행 중";
  if (status === "P") return "입양 확정";
  if (status === "C") return "취소";
  return status || "-";
}

function deliveryMethodLabel(code: string) {
  if (code === "DIR") return "직접 방문";
  if (code === "MET" || code === "MEET") return "직거래";
  if (code === "PIK") return "픽업";
  if (code === "DLV") return "배송";
  if (code === "ETC") return "기타";
  return code || "-";
}

export default function ContractPage({ params }: { params: Promise<{ postId: string }> }) {
  const router = useRouter();
  const { postId } = use(params);
  const numericPostId = Number(postId);

  const [data, setData] = useState<PostContractResponse | null>(null);
  const [status, setStatus] = useState("A");
  const [contractIdInput, setContractIdInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  async function loadData(nextStatus: string, nextContractId: string = contractIdInput) {
    if (!numericPostId) {
      setError("잘못된 게시글 경로입니다.");
      setData(null);
      setLoading(false);
      return;
    }

    setStatus(nextStatus);
    setLoading(true);
    setError(null);
    try {
      const response: PostContractResponse = await fetchContracts({
        type: "A",
        postId: numericPostId,
        status: nextStatus,
        contractId: nextContractId.trim() ? Number(nextContractId) : undefined,
      });
      setData(response);
    } catch {
      setData(null);
      setError("계약 상세 정보를 불러오지 못했습니다.");
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
    loadData("A", "");
  }, [numericPostId, router]);

  const contracts: ContractDTO[] = data?.contracts ?? [];

  return (
    <PageContainer title="계약 상세 관리" subtitle={`분양글 #${numericPostId}의 계약 상태를 확인하고 관리할 수 있어요`}>
      <div className="contract-page-shell">
        {!authorized ? null : (
          <>
            <div className="contract-toolbar">
              <div className="contract-toolbar-left">
                <input
                  type="text"
                  value={contractIdInput}
                  onChange={(e) => setContractIdInput(e.target.value)}
                  placeholder="계약 ID 검색"
                  className="contract-search-input"
                />

                <select value={status} onChange={(e) => setStatus(e.target.value)} className="contract-select">
                  <option value="A">진행 중</option>
                  <option value="P">입양 확정</option>
                  <option value="C">취소</option>
                </select>

                <button type="button" onClick={() => loadData(status)} className="contract-refresh-btn">
                  조회
                </button>
              </div>

              <Link href="/contracts" className="contract-home-btn contract-back-btn">
                목록으로
              </Link>
            </div>

            {error && <div className="contract-message contract-message-error">{error}</div>}

            {data?.post && <ContractHeader post={data.post} onRefresh={() => loadData(status)} />}

            {loading ? (
              <div className="contract-message">계약 정보를 불러오는 중입니다.</div>
            ) : contracts.length === 0 ? (
              <div className="contract-message">조회된 계약이 없습니다.</div>
            ) : (
              <div className="contract-detail-list">
                {contracts.map((contract) => (
                  <div key={contract.contractId} className="contract-detail-card">
                    <div className="contract-detail-card-top">
                      <div>
                        <div className="contract-detail-id">Contract #{contract.contractId}</div>
                        <div className="contract-detail-buyer">{contract.buyerUsername}</div>
                        <div className="contract-detail-buyer-meta">회원 #{contract.buyerId}</div>
                      </div>
                      <div className="contract-detail-badges">
                        <span className="contract-detail-badge">{contractStatusLabel(contract.contractStatus)}</span>
                        <span className="contract-detail-badge contract-detail-badge-muted">
                          {contract.confirmedAdopteeFlag === "Y" ? "확정" : "미확정"}
                        </span>
                      </div>
                    </div>

                    <div className="contract-detail-grid">
                      <div className="contract-detail-box">
                        <span>신청일</span>
                        <strong>{contract.adoptionAppDate || "-"}</strong>
                      </div>
                      <div className="contract-detail-box">
                        <span>전달 방식</span>
                        <strong>{deliveryMethodLabel(contract.deliveryMethod)}</strong>
                      </div>
                      <div className="contract-detail-box">
                        <span>분양 금액</span>
                        <strong>{Number(contract.adoptionFee || 0).toLocaleString()}원</strong>
                      </div>
                      <div className="contract-detail-box">
                        <span>총액</span>
                        <strong>{Number(contract.totalAmount || 0).toLocaleString()}원</strong>
                      </div>
                    </div>

                    <div className="contract-detail-meta-row">
                      <div>계약일: {contract.contractDate || "-"}</div>
                      <div>수수료: {Number(contract.commissionFee || 0).toLocaleString()}원</div>
                      <div>최종 수정: {contract.contractUpdatedAt || "-"}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
