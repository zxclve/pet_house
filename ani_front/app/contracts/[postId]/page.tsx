'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';

export default function ContractPage({ params }: { params: Promise<{ postId: string }> }) {

  const { postId } = use(params);
  const id = Number(postId);

  const [post, setPost] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);

  const [status, setStatus] = useState('A');
  const [searchStatus, setSearchStatus] = useState('A');

  // =============================
  // ✅ 계약ID 검색 추가
  // =============================
  const [contractId, setContractId] = useState('');

  const [editMode, setEditMode] = useState(false);

  const statusOptions = [
    { value: 'O', label: 'ALL' },
    { value: 'A', label: '신청' },
    { value: 'C', label: '취소' },
    { value: 'P', label: '보류' }
  ];

  const deliveryOptions = [
    { value: 'DIR', label: '직접방문' },
    { value: 'MET', label: '직거래' },
    { value: 'PIK', label: '배송서비스' },
    { value: 'DLV', label: '분양자배송' },
    { value: 'ETC', label: '기타' }
  ];


  const postStatusLabel = (status: string) => {
  switch (status) {
    case 'A':
      return '신청 (ACTIVE)';
    case 'C':
      return '취소 (CANCELLED)';
    case 'P':
      return '보류 (PENDING)';
    case 'Y':
      return '완료 (COMPLETED)';
    default:
      return '-';
  }
};

  const handleComplete = () => {
    alert('입양완료 처리 (추후 API 연결)');
  };

  // =============================
  // 🔥 조회 버튼
  // =============================
  const handleSearch = () => {
    setSearchStatus(status);
  };

  const MultiBox = ({ value }: { value: any }) => (
    <textarea
      readOnly
      rows={3}
      className="border px-2 py-1 rounded bg-gray-50 w-[40ch] resize-none"
      value={value ?? ''}
    />
  );

  const Box = ({ value }: { value: any }) => {
    const isNumber = typeof value === 'number';

    return (
      <span
        className={`inline-block border px-2 py-1 rounded bg-gray-50 w-[14ch] font-medium ${
          isNumber ? 'text-right' : 'text-left'
        }`}
      >
        {value ?? '-'}
      </span>
    );
  };

  const handleCancelPost = () => {
    if (!confirm('정말 분양을 취소하시겠습니까?')) return;

    alert('분양취소 API 연결 예정');
    // fetch("http://localhost:8686/api/post/cancel", ...)
  };

  // =============================
  // 🔥 API 호출 (계약ID 포함 반영)
  // =============================
  useEffect(() => {

    const apiStatus = searchStatus === 'O' ? '' : searchStatus;
    const apiContractId = contractId.trim(); // ⭐ 추가

    fetch(
      `http://localhost:8686/api/contracts?type=A&postId=${id}&status=${apiStatus}&contractId=${apiContractId}`
    )
      .then(res => res.json())
      .then(data => {
        setPost(data.post);
        setContracts(Array.isArray(data.contracts) ? data.contracts : []);
      })
      .catch(() => {
        setContracts([]);
      });

  }, [id, searchStatus, contractId]); // ⭐ contractId 포함

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6 max-w-[1600px] mx-auto">

      {/* ================= 타이틀 ================= */}
      <h1 className="text-center mb-6">
        <div className="text-lg font-semibold">
          분양계약서작성
        </div>
        <div className="text-sm font-semibold text-gray-500">
          (관리자용)
        </div>
      </h1>

      {/* ================= 분양 정보 ================= */}
      {post && (
        <div className="bg-white p-6 rounded shadow space-y-4">

          <div className="flex gap-6">

            <img
              src={post.imageUrl}
              className="w-48 h-48 object-cover border rounded"
            />

            <div className="flex-1 space-y-3 text-sm">

              <div className="flex gap-4 flex-wrap">
                <div>분양자성명: <Box value={post.sellerUsername} /></div>
                <div>주    소  : <Box value={post.sellerAddress1} /></div>
                <div>
                  신청상태 :
                  <span className="inline-block border px-2 py-1 rounded bg-gray-50 w-[18ch] font-medium">
                    {postStatusLabel(post.adoptionStatus)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <div>카테고리  : <Box value={post.categoryName} /></div>
                <div>품    종 : <Box value={post.breed} /></div>
                <div>출 생 일 : <Box value={post.birthDate} /></div>
                <div>나    이 : <Box value={1} /></div>
              </div>

              <div className="flex gap-6 flex-wrap items-start">
                <div>분 양 가 : <Box value={post.price} /> 원</div>

                <div className="flex flex-col">
                  <span>모색 및 특징 :</span>
                  <MultiBox value={post.colorFeatures} />
                </div>

                <div className="flex flex-col">
                  <span>건강상태 :</span>
                  <MultiBox value={post.healthStatus} />
                </div>
              </div>
            </div>
          </div>

          {/* ================= 🔥 분양 버튼 영역 ================= */}
          <div className="flex justify-end gap-2 pt-4">

            <button
              onClick={handleCancelPost}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              분양취소
            </button>

            <button
              onClick={handleComplete}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              입양완료
            </button>

          </div>
        </div>
      )}

      {/* ================= 검색 ================= */}
      <div className="bg-white p-4 rounded shadow flex justify-between items-center">

        <div className="flex items-center gap-4">

          {/* 🔥 계약ID 검색 추가 */}
          <div className="flex items-center gap-2">
            <span>계약ID</span>
            <input
              type="text"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              className="border p-2 rounded w-28"
              placeholder="입력"
            />
          </div>

          <span>진행상태</span>

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            조회
          </button>

          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editMode ? '수정취소' : '수정'}
          </button>

        </div>
      </div>

      {/* ================= 테이블 ================= */}
      <div className="bg-white rounded shadow overflow-x-auto">

        <table className="w-full text-sm text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th>Seq</th>
              <th>계약ID</th>
              <th>입양자ID</th>
              <th>입양자이름</th>
              <th>신청일</th>
              <th>입양확정자</th>
              <th>상태</th>
              <th>계약일</th>
              <th>인도조건</th>
              <th>분양금액</th>
              <th>수수료</th>
              <th>총금액</th>
            </tr>
          </thead>

          <tbody>
            {contracts.length === 0 && (
              <tr>
                <td colSpan={12}>데이터 없음</td>
              </tr>
            )}

            {contracts.map((c, i) => (
              <tr key={c.contractId} className="border-t">

                <td>{i + 1}</td>
                <td>{c.contractId}</td>
                <td>{c.buyerId}</td>
                <td>{c.buyerUsername}</td>
                <td>{c.adoptionAppDate}</td>

                <td>
                  <select className="border p-1" defaultValue={c.confirmedAdopteeFlag}>
                    <option value="Y">확정</option>
                    <option value="N">미확정</option>
                  </select>
                </td>

                <td>
                  <select className="border p-1" defaultValue={c.contractStatus}>
                    {statusOptions.slice(1).map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{c.contractDate}</td>

                <td>
                  <select className="border p-1" defaultValue={c.deliveryMethod}>
                    {deliveryOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="text-right">{c.adoptionFee}</td>
                <td className="text-right">{c.commissionFee ?? '-'}</td>
                <td className="text-right">{c.totalAmount ?? '-'}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}