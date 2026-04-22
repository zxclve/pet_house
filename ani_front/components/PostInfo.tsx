import Image from 'next/image';

export default function PostInfo({ post }: any) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-semibold mb-3">분양 정보</h2>

      <div className="flex gap-6">
        <Image
          src={post.imageUrl}
          alt="pet"
          width={150}
          height={150}
          className="rounded"
        />

        <div className="space-y-2 text-sm">
          <div>분양자 성명: {post.sellerUsername}</div>
          <div>주소: {post.sellerAddress1}</div>
          <div>신청상태: {post.adoptionStatus}</div>

          <div>품종: {post.breed}</div>
          <div>출생일: {post.birthDate}</div>

          <div>분양가: {post.price} 원</div>

          <div className="whitespace-pre-line">
            모색 및 특징: {post.colorFeatures}
          </div>

          <div className="whitespace-pre-line">
            건강상태: {post.healthStatus}
          </div>
        </div>
      </div>
    </div>
  );
}