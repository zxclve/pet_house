"use client";

import { useEffect, useState } from "react";
import { fetchContracts } from "../services/contractService";

export function useContracts() {
  const [post, setPost] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (params?: any) => {
    setLoading(true);

    try {
      const data = await fetchContracts(params);

      setPost(data.post);
      setContracts(data.contracts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(); // 최초 로딩
  }, []);

  return {
    post,
    contracts,
    loading,
    load,
  };
}