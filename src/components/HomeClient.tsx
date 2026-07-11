"use client";

import { useState } from "react";
import Link from "next/link";
import { WPCategory } from "@/lib/wordpress";

interface HomeClientProps {
  categories: WPCategory[];
}

export default function HomeClient({ categories }: HomeClientProps) {
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
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4-4"/>
            </svg>
            <input placeholder="글, 주제, 키워드 검색..." />
          </label>

          <div className="nav__spacer"></div>

          <nav className="nav__menu">
            <Link href="/" className="nav__link on">홈</Link>
            <Link href="/category/info" className="nav__link">정보</Link>
            <Link href="/category/tips" className="nav__link">꿀팁</Link>
          </nav>

          <div className="nav__right">
            <button
              className="nav__searchbtn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="검색"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4-4"/>
              </svg>
            </button>
            <button
              className="nav__burger"
              onClick={() => setMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <span></span>
              <span></span>
              <span></span>
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
                className={`drawer__item ${cat.slug === "" ? "on" : ""}`}
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
    </>
  );
}
