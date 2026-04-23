import { PostHeader } from "../types/contract";

export default function ContractHeader({ post }: { post: PostHeader }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow">

      <div className="flex gap-4">

        {/* 이미지 */}
        <img
          src={post.imageUrl}
          className="w-32 h-32 object-cover rounded"
        />

        {/* 정보 */}
        <div className="space-y-1">
          <div>분양자: {post.sellerUsername}</div>
          <div>주소: {post.sellerAddress1}</div>
          <div>품종: {post.breed}</div>
          <div>성별: {post.gender}</div>
          <div>출생일: {post.birthDate}</div>
          <div>분양가: {post.price}원</div>
          <div>건강: {post.healthStatus}</div>
        </div>

      </div>
    </div>
  );
}