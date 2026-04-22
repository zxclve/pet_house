import { useState } from "react";

export default function ContractSearch({
  onSearch,
}: {
  onSearch: (status: string) => void;
}) {
  const [status, setStatus] = useState("A");

  return (
    <div className="flex gap-2 items-center">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2"
      >
        <option value="A">전체 (신청)</option>
        <option value="C">취소</option>
        <option value="P">보류</option>
      </select>

      <button
        onClick={() => onSearch(status)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        조회
      </button>

    </div>
  );
}