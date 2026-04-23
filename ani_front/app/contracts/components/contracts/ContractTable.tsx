import { ContractDTO } from "../../types/contract";

export default function ContractTable({
  contracts,
}: {
  contracts: ContractDTO[];
}) {
  return (
    <table className="w-full border mt-4">

      <thead className="bg-gray-100">
        <tr>
          <th>Seq</th>
          <th>계약ID</th>
          <th>입양자</th>
          <th>상태</th>
          <th>인도조건</th>
          <th>총금액</th>
        </tr>
      </thead>

      <tbody>
        {contracts.map((c, idx) => (
          <tr key={c.contractId} className="text-center border-t">

            <td>{idx + 1}</td>
            <td>{c.contractId}</td>
            <td>{c.buyerUsername}</td>
            <td>{c.contractStatus}</td>
            <td>{c.deliveryMethod}</td>
            <td>{c.totalAmount}</td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}