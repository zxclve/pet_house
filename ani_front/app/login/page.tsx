"use client";

import { useState } from "react";
import PageContainer from "../components/PageContainer";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const loginid = (form.elements.namedItem("loginid") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("http://localhost:8686/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginid, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = "/";
      } else {
        setError(data.message || "로그인 실패");
      }
    } catch {
      setError("서버 연결 오류입니다.");
    }
  }

  return (
    <PageContainer
      title="로그인"
      subtitle="펫 하우스에 로그인하고 입양을 시작해보세요"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginid" className="form-label">아이디</label>
          <input
            id="loginid"
            name="loginid"
            type="text"
            className="form-input"
            placeholder="아이디를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-btn">로그인</button>
      </form>
    </PageContainer>
  );
}