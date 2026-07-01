"use client";

import { useEffect, useState } from "react";
import { fetchContracts, type ContractSearchParams } from "../types/contractsApi";

export function useContracts() {
  const [post, setPost] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (params?: ContractSearchParams) => {
    setLoading(true);

    try {
      const data = await fetchContracts({ type: "A", status: "A", ...params });

      setPost(data.post);
      setContracts(data.contracts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load({ type: "A", status: "A" });
  }, []);

  return {
    post,
    contracts,
    loading,
    load,
  };
}