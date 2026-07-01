"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchContracts } from "./types/contractsApi";
import ContractHeader from "./components/ContractHeader";
import ContractSearch from "./components/ContractSearch";
import ContractTable from "./components/contracts/ContractTable";
import { PostContractResponse } from "./types/contract";

export default function ContractsPage() {
  const [data, setData] = useState<PostContractResponse | null>(null);
  const [lastStatus, setLastStatus] = useState("A");
  const [error, setError] = useState<string | null>(null);

  const loadData = async (status: string = "A") => {
    setLastStatus(status);
    setError(null);
    try {
      const res = await fetchContracts({
        type: "A",
        status,
      });
      setData(res);
    } catch {
      setData(null);
      setError("계약 정보를 불러오지 못했습니다. 로그인 상태를 확인해 주세요.");
    }
  };

  useEffect(() => {
    loadData("A");
  }, []);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">분양 계약 · 관리</h1>
        <Link
          href="/"
          className="rounded-full px-4 py-2 text-sm font-bold text-white"
          style={{
            background: "#ff7aa2",
            boxShadow: "0 8px 20px rgba(255,122,162,0.18)",
          }}
        >
          홈으로
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
        </div>
      )}

      {data?.post && <ContractHeader post={data.post} onRefresh={() => loadData(lastStatus)} />}

      <ContractSearch onSearch={loadData} />

      <ContractTable contracts={data?.contracts || []} />
    </div>
  );
}