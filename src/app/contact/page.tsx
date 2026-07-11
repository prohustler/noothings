"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "전체", slug: "", icon: "🏠", color: "#2E6BF6" },
  { name: "정보", slug: "info", icon: "📚", color: "#00A676" },
  { name: "꿀팁", slug: "tips", icon: "💡", color: "#FF6400" },
];

export default function ContactPage() {
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
        <h1 className="static-page__title">문의</h1>

        <div className="static-page__content">
          <h2>문의하기</h2>
          <p>
            누띵즈에 대한 문의사항, 제안, 또는 피드백이 있으시면 아래 방법으로 연락해 주세요.
          </p>

          <h2>이메일</h2>
          <p>
            <a href="mailto:contact@noothings.kr" className="contact-email">
              contact@noothings.kr
            </a>
          </p>

          <h2>문의 시 참고사항</h2>
          <ul>
            <li>문의 내용을 구체적으로 작성해 주시면 빠른 답변이 가능합니다.</li>
            <li>영업일 기준 1~3일 내에 답변드립니다.</li>
            <li>광고 및 제휴 문의도 환영합니다.</li>
          </ul>

          <h2>자주 묻는 질문</h2>
          <p>
            문의하시기 전에 <Link href="/">홈페이지</Link>에서 관련 글을 먼저 확인해 주세요.
            많은 질문에 대한 답변이 이미 게시되어 있을 수 있습니다.
          </p>
        </div>
      </article>

      {/* Footer */}
      <footer className="foot">
        <div className="wrap foot__row">
          <div className="foot__links">
            <Link href="/about">소개</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/contact" className="on">문의</Link>
          </div>
          <span className="foot__copy">© 2024 누띵즈</span>
        </div>
      </footer>
    </>
  );
}
