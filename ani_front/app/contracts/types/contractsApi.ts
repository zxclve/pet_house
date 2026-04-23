export interface ContractSearchParams {
  type?: string;
  contractId?: number;
  status: string;
}

export const fetchContracts = async (params: ContractSearchParams) => {
  const query = new URLSearchParams();

  if (params.type) query.append("type", params.type);
  if (params.contractId) query.append("contractId", String(params.contractId));
  query.append("status", params.status);

  const res = await fetch(`/api/contracts?${query.toString()}`);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};