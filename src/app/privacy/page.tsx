"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  { name: "전체", slug: "", icon: "🏠", color: "#2E6BF6" },
  { name: "정보", slug: "info", icon: "📚", color: "#00A676" },
  { name: "꿀팁", slug: "tips", icon: "💡", color: "#FF6400" },
];

export default function PrivacyPage() {
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
        <h1 className="static-page__title">개인정보처리방침</h1>

        <div className="static-page__content">
          <p><em>최종 수정일: 2024년 7월</em></p>

          <h2>1. 개인정보의 수집 및 이용 목적</h2>
          <p>
            누띵즈(이하 "사이트")는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않습니다.
          </p>
          <ul>
            <li>서비스 제공 및 운영</li>
            <li>문의사항 및 민원 처리</li>
            <li>서비스 개선 및 신규 서비스 개발</li>
          </ul>

          <h2>2. 수집하는 개인정보 항목</h2>
          <p>사이트는 서비스 제공을 위해 다음과 같은 정보를 수집할 수 있습니다:</p>
          <ul>
            <li>문의 시: 이메일 주소, 문의 내용</li>
            <li>자동 수집: 접속 IP, 브라우저 종류, 접속 일시</li>
          </ul>

          <h2>3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            수집된 개인정보는 수집 목적이 달성된 후 즉시 파기됩니다.
            단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관됩니다.
          </p>

          <h2>4. 쿠키(Cookie) 사용</h2>
          <p>
            사이트는 Google Analytics 및 Google AdSense를 통해 쿠키를 사용할 수 있습니다.
            쿠키는 브라우저 설정을 통해 거부할 수 있습니다.
          </p>

          <h2>5. 개인정보 보호책임자</h2>
          <p>
            개인정보 처리에 관한 문의사항은 <Link href="/contact">문의 페이지</Link>를 통해 연락해 주세요.
          </p>

          <h2>6. 개인정보처리방침 변경</h2>
          <p>
            이 개인정보처리방침은 법령 및 방침에 따라 변경될 수 있으며,
            변경 시 사이트를 통해 공지됩니다.
          </p>
        </div>
      </article>

      {/* Footer */}
      <footer className="foot">
        <div className="wrap foot__row">
          <div className="foot__links">
            <Link href="/about">소개</Link>
            <Link href="/privacy" className="on">개인정보처리방침</Link>
            <Link href="/contact">문의</Link>
          </div>
          <span className="foot__copy">© 2024 누띵즈</span>
        </div>
      </footer>
    </>
  );
}
