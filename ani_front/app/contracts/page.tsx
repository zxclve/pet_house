'use client';

import { useEffect, useState } from 'react';

export default function ContractPage({ params }: { params: { postId: string } }) {

  const postId = Number(params.postId);

  const [post, setPost] = useState<any>(null);        // 분양정보
  const [contracts, setContracts] = useState<any[]>([]); // 계약정보
  const [status, setStatus] = useState('A');      // 기본 A

  // 상태 옵션
  const statusOptions = [
    { value: '', label: 'ALL' },
    { value: 'A', label: '신청' },
    { value: 'C', label: '취소' },
    { value: 'P', label: '보류' }
  ];

  const deliveryOptions = [
    { value: 'DIR', label: '직접방문' },
    { value: 'MET', label: '직거래' },
    { value: 'PIK', label: '배송서비스' },
    { value: 'DLV', label: '분양자직접배송' },
    { value: 'ETC', label: '기타' }
  ];

  // 📌 분양정보 (한 번만)
  useEffect(() => {
    fetch(`http://localhost:8686/api/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [postId]);

  // 📌 계약정보 (status 변경 시마다)
  useEffect(() => {
    fetch(`http://localhost:8686/api/contracts?type=A&postId=${postId}&status=${status}`)
      .then(res => res.json())
      .then(data => setContracts(data));
  }, [status, postId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold mb-6">
        분양계약서작성 (관리자용)
      </h1>

      {/* ================= 분양 정보 ================= */}
      {post && (
        <div className="bg-white p-4 rounded shadow mb-6 flex gap-6">

          {/* 이미지 */}
          <img
            src={post.imageUrl}
            className="w-48 h-48 object-cover rounded"
            alt="pet"
          />

          {/* 정보 */}
          <div className="flex-1 text-sm space-y-1">
            <p>분양자: {post.sellerUsername} / 주소: {post.sellerAddress1}</p>
            <p>카테고리: {post.categoryName} / 품종: {post.breed}</p>
            <p>출생일: {post.birthDate} / 가격: {post.price}원</p>
            <p>특징: {post.colorFeatures}</p>
            <p>건강상태: {post.healthStatus}</p>
          </div>
        </div>
      )}

      {/* ================= 검색조건 ================= */}
      <div className="bg-white p-4 rounded shadow mb-4 flex items-center gap-4">

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

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setStatus(status)}
        >
          조회
        </button>
      </div>

      {/* ================= 계약 리스트 ================= */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm text-center border">
          <thead className="bg-gray-200">
            <tr>
              <th>Seq</th>
              <th>계약ID</th>
              <th>입양자ID</th>
              <th>입양자이름</th>
              <th>신청일</th>
              <th>상태</th>
              <th>계약일</th>
              <th>인도조건</th>
              <th>분양금액</th>
              <th>수수료</th>
              <th>총금액</th>
            </tr>
          </thead>

          <tbody>
            {contracts.map((c, index) => (
              <tr key={c.contractId} className="border-t">

                {/* Seq */}
                <td>{index + 1}</td>

                <td>{c.contractId}</td>
                <td>{c.buyerId}</td>
                <td>{c.buyerUsername}</td>
                <td>{c.adoptionAppDate}</td>

                {/* 상태 */}
                <td>
                  <select
                    className="border p-1"
                    defaultValue={c.status}
                  >
                    {statusOptions.slice(1).map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{c.contractDate}</td>

                {/* 인도조건 */}
                <td>
                  <select
                    className="border p-1"
                    defaultValue={c.deliveryMethod}
                  >
                    {deliveryOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td>{c.adoptionFee}</td>
                <td>{c.commissionFee}</td>
                <td>{c.totalAmount}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}