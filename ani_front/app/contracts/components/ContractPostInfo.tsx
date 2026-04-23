export default function ContractPostInfo({ post }: any) {
  if (!post) return null;

  return (
    <div className="border p-4 rounded-lg flex gap-4">
      <img
        src={post.imageUrl}
        className="w-40 h-40 object-cover rounded"
      />

      <div className="space-y-1">
        <p>분양자: {post.sellerUsername}</p>
        <p>주소: {post.sellerAddress1}</p>
        <p>품종: {post.breed}</p>
        <p>출생일: {post.birthDate}</p>
        <p>가격: {post.price}</p>
        <p>상태: {post.adoptionStatus}</p>
      </div>
    </div>
  );
}