import type { PetItem } from "./petStore";
import type { CategoryDto, PostPage, PostSiteDto } from "./postTypes";
import { resolveMediaUrl } from "./backendOrigin";

function authHeaders(): HeadersInit {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function typeEmoji(typeName: string): string {
  if (typeName.includes("강아지")) return "🐶";
  if (typeName.includes("고양이")) return "🐱";
  if (typeName.includes("토끼")) return "🐰";
  if (typeName.includes("햄스터")) return "🐹";
  if (typeName.includes("새")) return "🐦";
  return "🐾";
}

function imgClass(typeName: string): string {
  if (typeName.includes("강아지")) return "dog";
  if (typeName.includes("고양이")) return "cat";
  if (typeName.includes("토끼")) return "rabbit";
  if (typeName.includes("햄스터")) return "hamster";
  if (typeName.includes("새")) return "bird";
  return "dog";
}

export function mapPostToPetItem(p: PostSiteDto): PetItem {
  const typeName = p.category?.categoryName ?? "";
  const birth = p.birthDate ?? "";
  return {
    id: p.postId,
    name: `${p.breed} 친구`,
    breed: p.breed,
    age: birth ? `출생 ${birth}` : "미상",
    type: typeName || "기타",
    emoji: typeEmoji(typeName),
    imgClass: imgClass(typeName),
    tags: p.colorFeatures ? [p.colorFeatures.slice(0, 24)] : ["분양"],
    isNew: true,
    liked: false,
    img: resolveMediaUrl(p.imageUrl ?? undefined),
    healthStatus: p.healthStatus ?? undefined,
    colorFeatures: p.colorFeatures,
    price: typeof p.price === "number" ? p.price : Number(p.price),
    gender: p.gender,
    birthDate: birth,
  };
}

export async function fetchPostsPage(page: number, keyword: string): Promise<PostPage> {
  const q = new URLSearchParams();
  q.set("page", String(page));
  q.set("keyword", keyword);
  const res = await fetch(`/api/posts?${q.toString()}`, { cache: "no-store" });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "게시글을 불러오지 못했습니다.");
  }
  return res.json();
}

export async function fetchPostDetail(postId: number): Promise<PostSiteDto> {
  const res = await fetch(`/api/posts/${postId}`, { cache: "no-store" });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "상세 조회에 실패했습니다.");
  }
  return res.json();
}

export async function fetchCategories(): Promise<CategoryDto[]> {
  const res = await fetch("/api/categories", { cache: "no-store" });
  if (!res.ok) throw new Error("카테고리를 불러오지 못했습니다.");
  return res.json();
}

export async function createPostJson(body: Record<string, unknown>): Promise<PostSiteDto> {
  const res = await fetch("/api/posts/create-json", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "등록에 실패했습니다.");
  }
  return res.json();
}

export async function createPostMultipart(formData: FormData): Promise<PostSiteDto> {
  const res = await fetch("/api/posts/create", {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "등록에 실패했습니다.");
  }
  return res.json();
}

export async function postApply(postId: number): Promise<void> {
  const res = await fetch(`/api/posts/${postId}/apply`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "신청에 실패했습니다.");
  }
}

export async function postAdminComplete(postId: number): Promise<void> {
  const res = await fetch(`/api/posts/${postId}/complete`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "완료 처리에 실패했습니다.");
  }
}

export async function postAdminCancel(postId: number): Promise<void> {
  const res = await fetch(`/api/posts/${postId}/admin-cancel`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "관리자 취소에 실패했습니다.");
  }
}
