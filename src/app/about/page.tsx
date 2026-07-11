"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "전체", slug: "", icon: "🏠", color: "#2E6BF6" },
  { name: "정보", slug: "info", icon: "📚", color: "#00A676" },
  { name: "꿀팁", slug: "tips", icon: "💡", color: "#FF6400" },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <header className="nav">
        <div className="wrap nav__inner">
          <Link href="/" className="logo">
            <span className="logo__text">누띵즈</span>
          </Link>

          <label className={`nav__search ${searchOpen ? "open" : ""}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B8D98" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
            </svg>
            <input placeholder="글, 주제, 키워드 검색..." />
          </label>

          <div className="nav__spacer"></div>

          <nav className="nav__menu">
            <Link href="/" className="nav__link">홈</Link>
            <Link href="/category/info" className="nav__link">정보</Link>
            <Link href="/category/tips" className="nav__link">꿀팁</Link>
          </nav>

          <div className="nav__right">
            <button className="nav__searchbtn" onClick={() => setSearchOpen(!searchOpen)} aria-label="검색">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>
              </svg>
            </button>
            <button className="nav__burger" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`drawer-back ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <aside className="drawer" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__head">
            <span style={{ fontSize: "18px", fontWeight: 800 }}>누띵즈</span>
            <button onClick={() => setMenuOpen(false)} style={{ padding: "8px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </button>
          </div>
          <nav className="drawer__nav">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/category/${cat.slug}` : "/"}
                className="drawer__item"
                onClick={() => setMenuOpen(false)}
              >
                <span className="drawer__ico" style={{ background: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </span>
                {cat.name}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Content */}
      <article className="center static-page">
        <h1 className="static-page__title">소개</h1>

        <div className="static-page__content">
          <h2>누띵즈</h2>
          <p>
            읽고 나면 하나라도 정확히 알게 되는 글을 씁니다.
          </p>
          <p>
            검색해도 광고만 나오고, 블로그 글은 돌려막기뿐이고,
            결국 뭐가 맞는지 모르겠을 때 있잖아요.
            그래서 직접 찾아보고 정리합니다.
          </p>

          <h2>다루는 주제</h2>
          <ul>
            <li><strong>정보</strong> — 택배 분실 보상, 전기세 계산, 환불 절차 등 정확한 정보</li>
            <li><strong>꿀팁</strong> — 에어컨, 곰팡이, 청소 등 직접 해보고 효과 본 방법</li>
          </ul>

          <h2>문의</h2>
          <p>
            궁금한 점이나 다뤄줬으면 하는 주제가 있으면 <Link href="/contact">문의 페이지</Link>로 보내주세요.
          </p>
        </div>
      </article>

      {/* Footer */}
      <footer className="foot">
        <div className="wrap foot__row">
          <div className="foot__links">
            <Link href="/about" className="on">소개</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/contact">문의</Link>
          </div>
          <span className="foot__copy">© 2024 누띵즈</span>
        </div>
      </footer>
    </>
  );
}
