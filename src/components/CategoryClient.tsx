"use client";

import { useState } from "react";
import Link from "next/link";
import { WPPost, WPCategory } from "@/lib/wordpress";

interface CategoryClientProps {
  slug: string;
  category: {
    name: string;
    icon: string;
    color: string;
    description: string;
  };
  posts: WPPost[];
  categories: WPCategory[];
}

export default function CategoryClient({ slug, category, posts, categories }: CategoryClientProps) {
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
            <Link href="/" className="nav__link">홈</Link>
            <Link href="/category/info" className={`nav__link ${slug === "info" ? "on" : ""}`}>정보</Link>
            <Link href="/category/tips" className={`nav__link ${slug === "tips" ? "on" : ""}`}>꿀팁</Link>
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
                className={`drawer__item ${cat.slug === slug ? "on" : ""}`}
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

      {/* Main Layout */}
      <div className="wrap">
        <div className="layout">
          {/* Left Sidebar */}
          <aside className="side">
            <div className="side__h">카테고리</div>
            <nav className="snav">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug ? `/category/${cat.slug}` : "/"}
                  className={cat.slug === slug ? "on" : ""}
                >
                  <span className="snav__ico" style={{ background: `${cat.color}15`, color: cat.color }}>
                    {cat.icon}
                  </span>
                  {cat.name}
                </Link>
              ))}
            </nav>

            <div className="side__h side__h--gap">인기 태그</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "0 10px" }}>
              {["에어컨", "전기세", "택배", "곰팡이", "여름", "청소"].map((tag) => (
                <span key={tag} className="fchip" style={{ padding: "6px 12px", fontSize: "12.5px" }}>
                  #{tag}
                </span>
              ))}
            </div>
          </aside>

          {/* Feed */}
          <main className="feed">
            {/* Category Header */}
            <div className="cathead">
              <div className="cathead__ico" style={{ background: `${category.color}15`, color: category.color }}>
                {category.icon}
              </div>
              <div>
                <h1 className="cathead__t">{category.name}</h1>
                <p className="cathead__s">{category.description}</p>
              </div>
            </div>

            {/* Post List */}
            <div className="plist">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Link key={post.id} href={`/${post.category.slug}/${post.slug}`} className="pi">
                    <div className="pi__main">
                      <div className="pi__meta">
                        <span className="cpill">{post.category.name}</span>
                        <span className="dot"></span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="pi__title">{post.title}</h3>
                      <p className="pi__sub">{post.excerpt}</p>
                    </div>
                    <div className="pi__thumb">
                      <img src={post.thumbnail} alt="" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="empty">
                  <div className="empty__em">📭</div>
                  <p>아직 글이 없습니다</p>
                </div>
              )}
            </div>

            {posts.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <button className="btn btn--soft btn--full">더 보기</button>
              </div>
            )}
          </main>

          {/* Right Rail */}
          <aside className="rail">
            <div className="panel">
              <div className="panel__k">🔥 {category.name} 인기 글</div>
              {posts.slice(0, 4).map((post, idx) => (
                <Link key={post.id} href={`/${post.category.slug}/${post.slug}`} className="trend">
                  <span className="trend__n">{idx + 1}</span>
                  <div>
                    <div className="trend__t">{post.title}</div>
                    <div className="trend__m">{post.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="foot">
        <div className="wrap foot__row">
          <div className="foot__links">
            <Link href="/about">소개</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/contact">문의</Link>
          </div>
          <span className="foot__copy">© 2024 누띵즈</span>
        </div>
      </footer>
    </>
  );
}
