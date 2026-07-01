export async function fetchContracts(params?: {
  contractId?: number;
  status?: string;
}) {
  const query = new URLSearchParams();

  if (params?.contractId) {
    query.append("contractId", String(params.contractId));
  }

  if (params?.status) {
    query.append("status", params.status);
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`/api/contracts?${query.toString()}`, { headers });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}