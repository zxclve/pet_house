"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface PageContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageContainer({
  title,
  subtitle,
  children,
}: PageContainerProps) {
  return (
    <div className="pet-app">
      <nav className="top-nav">
        <Link href="/" className="nav-logo">🏠 펫 하우스</Link>

        <div className="nav-right">
          <Link href="/login" className="login-btn">로그인</Link>
          <Link href="/signup" className="login-btn">회원가입</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">PET HOUSE</div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </section>

      <main className="page-wrap">
        <div className="page-card">
          {children}
        </div>
      </main>
    </div>
  );
}