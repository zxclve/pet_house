export default function ContractTable({ contracts }: any) {
  return (
    <table className="w-full border text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th>Seq</th>
          <th>계약ID</th>
          <th>입양자</th>
          <th>신청일</th>
          <th>확정</th>
          <th>상태</th>
          <th>계약일</th>
          <th>인도조건</th>
          <th>분양금액</th>
          <th>수수료</th>
          <th>총금액</th>
        </tr>
      </thead>

      <tbody>
        {contracts.map((c: any, i: number) => (
          <tr key={c.contractId} className="border-t">
            <td>{i + 1}</td>
            <td>{c.contractId}</td>
            <td>{c.buyerUsername}</td>
            <td>{c.adoptionAppDate}</td>
            <td>{c.confirmedAdopteeFlag}</td>

            {/* 상태 */}
            <td>
              <select defaultValue={c.contractStatus}>
                <option value="A">신청</option>
                <option value="C">취소</option>
                <option value="P">보류</option>
              </select>
            </td>

            <td>{c.contractDate}</td>

            {/* 인도조건 */}
            <td>
              <select defaultValue={c.deliveryMethod}>
                <option value="DIR">직접방문</option>
                <option value="MET">직거래</option>
                <option value="PIK">배송서비스</option>
                <option value="DLV">직접배송</option>
                <option value="ETC">기타</option>
              </select>
            </td>

            <td>{c.adoptionFee}</td>
            <td>{c.commissionFee}</td>
            <td>{c.totalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}