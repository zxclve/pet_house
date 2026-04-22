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

  const res = await fetch(
    `/api/contracts?${query.toString()}`
  );

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}