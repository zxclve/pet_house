"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageContainer({ title, subtitle, children }: PageContainerProps) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="pet-app">
      <nav className="top-nav">
        <Link href="/" className="nav-logo">
          Pet House
        </Link>

        <div className="nav-right">
          {loggedIn ? (
            <>
              <span className="nav-link" style={{ fontSize: 13, fontWeight: 700, color: "#444" }}>
                {username}님
              </span>
              {isAdmin && (
                <button
                  type="button"
                  className="login-btn"
                  onClick={() => router.push("/contracts")}
                  style={{ background: "#6c5ce7" }}
                >
                  계약 관리
                </button>
              )}
              <button type="button" className="login-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="login-btn">
                로그인
              </Link>
              <Link href="/signup" className="login-btn">
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">PET HOUSE</div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </section>

      <main className="page-wrap">
        <div className="page-card">{children}</div>
      </main>
    </div>
  );
}
