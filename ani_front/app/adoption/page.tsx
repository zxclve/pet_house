"use client";

// 페이지 이동 기능을 사용하기 위한 임포트
import { useRouter } from "next/navigation";

export default function AdoptionDetailPage() {
  
  // 페이지 이동 기능
  const router = useRouter();
  // 기본상태 표시
  const status = "신청";
  // 상태 변화시 나타낼 CSS
  const statusList = [
    { name: "신청", bg: "bg-orange-100", text: "text-orange-600", dot: "bg-orange-500" },
    { name: "취소", bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
    { name: "완료", bg: "bg-green-100", text: "text-green-600", dot: "bg-green-500" },
  ];

  return (
    <div className="w-[90%] max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        반려동물 분양 상세정보
      </h1>

      {/* 상세 정보 */}
      <div className="space-y-4 border-2 border-red-300 p-6 rounded-lg shadow">

        <div>
          <label className="block mb-2 text-lg font-bold text-center">
            반려동물 이미지
          </label>

          <div className="mt-4 w-full h-64 border-2 border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
            <span className="text-sm text-gray-400">
              이미지 영역
            </span>
          </div>
        </div>

        {/* 동물 종류 */}
        <div>
          <label className="block mb-1 font-medium">동물 종류</label>
          <div className="w-full border p-2 rounded bg-gray-100 h-10"></div>
        </div>

        {/* 품종 */}
        <div>
          <label className="block mb-1 font-medium">품종</label>
          <div className="w-full border p-2 rounded bg-gray-100 h-10"></div>
        </div>

        {/* 성별 */}
        <div>
          <label className="block mb-1 font-medium">성별</label>
          <div className="w-full border p-2 rounded bg-gray-100 h-10"></div>
        </div>

        {/* 출생일 */}
        <div>
          <label className="block mb-1 font-medium">출생일</label>
          <div className="w-full border p-2 rounded bg-gray-100 h-10"></div>
        </div>

        {/* 모색 및 특징 */}
        <div>
          <label className="block mb-1 font-medium">모색 및 특징</label>
          <div className="w-full border p-2 rounded bg-gray-100 h-10"></div>
        </div>

        {/* 건강상태 */}
        <div>
          <label className="block mb-1 font-medium">건강상태</label>
          <div className="w-full border p-2 rounded bg-gray-100 min-h-[80px]"></div>
        </div>

        {/* 분양가 */}
        <div>
          <label className="block mb-1 font-medium">분양가</label>
          <div className="w-full border p-2 rounded bg-gray-100 h-10"></div>
        </div>

        {/* 분양상태 */}
        <div>
          <div className="flex gap-4 justify-end">
            {statusList.map((item) => {
              const isActive = status === item.name;

              return (
                <span
                  key={item.name}
                  className={`flex items-center gap-2 px-3 py-1 rounded font-medium ${
                    isActive
                      ? `${item.bg} ${item.text}`
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isActive ? item.dot : "bg-gray-400"}`}></span>
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>

      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button" onClick={() => router.push("/adoption/contract")} 
          className="px-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">입양신청</button>

        <button
          type="button" onClick={() => router.back()}
          className="px-6 bg-gray-500 text-white p-2 rounded hover:bg-gray-600">목록으로</button>
      </div>
    </div>
  );
}