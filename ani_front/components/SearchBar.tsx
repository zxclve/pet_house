export default function SearchBar({ onSearch }: any) {
  return (
    <div className="border p-4 rounded flex items-center gap-4">
      <input
        type="text"
        placeholder="입양신청번호"
        className="border px-2 py-1"
      />

      <select className="border px-2 py-1">
        <option value="">ALL</option>
        <option value="A">신청</option>
        <option value="C">취소</option>
        <option value="P">보류</option>
      </select>

      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        조회
      </button>

      <button className="bg-green-500 text-white px-3 py-1 rounded">
        수정
      </button>
    </div>
  );
}