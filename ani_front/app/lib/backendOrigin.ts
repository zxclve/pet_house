/** 브라우저에서 백엔드 정적 리소스(업로드 이미지 등) 절대 URL */
export function getBackendOrigin(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BACKEND_ORIGIN) {
    return process.env.NEXT_PUBLIC_BACKEND_ORIGIN.replace(/\/$/, "");
  }
  return "http://localhost:8686";
}

export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) return "/images/goldenretriever.png";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${getBackendOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}
