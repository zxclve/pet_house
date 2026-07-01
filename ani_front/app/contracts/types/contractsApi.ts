export interface ContractSearchParams {
  type?: string;
  postId?: number;
  contractId?: number;
  status?: string;
}

export const fetchContracts = async (params: ContractSearchParams = {}) => {
  const query = new URLSearchParams();

  query.append("type", params.type ?? "A");
  if (params.postId) query.append("postId", String(params.postId));
  if (params.contractId) query.append("contractId", String(params.contractId));
  query.append("status", params.status ?? "A");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`/api/contracts?${query.toString()}`, { headers });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};

export const fetchContractPosts = async (status: string = "A") => {
  const query = new URLSearchParams();
  query.append("status", status);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`/api/contracts/posts?${query.toString()}`, { headers });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};
