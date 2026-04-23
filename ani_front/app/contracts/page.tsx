"use client";

import { useEffect, useState } from "react";
import { fetchContracts } from "@/services/contractsApi";
import ContractHeader from "@/components/contracts/ContractHeader";
import ContractSearch from "@/components/contracts/ContractSearch";
import ContractTable from "@/components/contracts/ContractTable";
import { PostContractResponse } from "@/types/contract";

export default function ContractsPage() {
  const [data, setData] = useState<PostContractResponse | null>(null);

  const loadData = async (status: string = "A") => {
    const res = await fetchContracts({
      type: "A",
      status,
    });

    setData(res);
  };

  useEffect(() => {
    loadData("A"); // 기본 분양정보
  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold">
        분양계약서 작성 (관리자용)
      </h1>

      {/* 분양 정보 */}
      {data?.post && (
        <ContractHeader post={data.post} />
      )}

      {/* 검색 */}
      <ContractSearch onSearch={loadData} />

      {/* 테이블 */}
      <ContractTable contracts={data?.contracts || []} />

    </div>
  );
}