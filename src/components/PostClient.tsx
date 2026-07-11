"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WPPost, WPCategory } from "@/lib/wordpress";

interface TocItem {
  id: string;
  title: string;
}

interface PostClientProps {
  post: WPPost;
  relatedPosts: WPPost[];
  categories: WPCategory[];
  toc: TocItem[];
}

export default function PostClient({ post, relatedPosts, categories, toc }: PostClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [liked, setLiked] = useState(false);

  const categoryColor = post.category.slug === "tips" ? "#FF6400" : "#00A676";

  // TOC scroll tracking
  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const sections = toc.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

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
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
            <input placeholder="글, 주제, 키워드 검색..." />
          </label>

          <div className="nav__spacer"></div>

          <nav className="nav__menu">
            <Link href="/" className="nav__link">홈</Link>
            <Link href="/category/info" className={`nav__link ${post.category.slug === "info" ? "on" : ""}`}>정보</Link>
            <Link href="/category/tips" className={`nav__link ${post.category.slug === "tips" ? "on" : ""}`}>꿀팁</Link>
          </nav>

          <div className="nav__right">
            <button className="nav__searchbtn" onClick={() => setSearchOpen(!searchOpen)} aria-label="검색">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" />
              </svg>
            </button>
            <button className="nav__burger" onClick={() => setMenuOpen(true)} aria-label="메뉴 열기">
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
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="drawer__nav">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/category/${cat.slug}` : "/"}
                className={`drawer__item ${cat.slug === post.category.slug ? "on" : ""}`}
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

      {/* Article Layout */}
      <div className="post-layout">
        {/* TOC Sidebar */}
        {toc.length > 0 && (
          <aside className="post-toc">
            <div className="post-toc__inner">
              <div className="post-toc__title">목차</div>
              <nav className="post-toc__nav">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`post-toc__link ${activeSection === item.id ? "active" : ""}`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

        {/* Main Article */}
        <article className="post-main">
          {/* Category pill */}
          <Link
            href={`/category/${post.category.slug}`}
            className="detail__cat"
            style={{ background: `${categoryColor}15`, color: categoryColor }}
          >
            <span className="dot" style={{ background: categoryColor }}></span>
            {post.category.name}
          </Link>

          {/* Title */}
          <h1 className="detail__title">{post.title}</h1>

          {/* Meta info */}
          <div className="post-meta">
            <div className="post-meta__left">
              <div className="avatar" style={{ background: "var(--blue)" }}>누</div>
              <div>
                <div className="who__name">누띵즈</div>
                <div className="who__meta">{post.date}</div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="detail__media">
            <img src={post.thumbnail} alt={post.title} />
          </div>

          {/* Mobile TOC */}
          {toc.length > 0 && (
            <details className="mobile-toc">
              <summary>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                목차 보기
              </summary>
              <nav className="mobile-toc__nav">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="mobile-toc__link">
                    {item.title}
                  </a>
                ))}
              </nav>
            </details>
          )}

          {/* Content */}
          <div className="detail__body" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Action bar */}
          <div className="actionbar">
            <button className={`act ${liked ? "act--liked" : ""}`} onClick={() => setLiked(!liked)}>
              <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              좋아요
            </button>
          </div>

          {/* Author Box */}
          <div className="author-box">
            <div className="author-box__avatar" style={{ background: "var(--blue)" }}>누</div>
            <div className="author-box__info">
              <div className="author-box__name">누띵즈</div>
              <p className="author-box__bio">읽고 나면 하나라도 정확히 알게 되는 글을 씁니다.</p>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="related-section">
              <h3 className="related-section__title">관련 글</h3>
              <div className="plist">
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/${rp.category.slug}/${rp.slug}`} className="pi">
                    <div className="pi__main">
                      <div className="pi__meta">
                        <span className="cpill">{rp.category.name}</span>
                        <span className="dot"></span>
                        <span>{rp.date}</span>
                      </div>
                      <h3 className="pi__title">{rp.title}</h3>
                      <p className="pi__sub">{rp.excerpt}</p>
                    </div>
                    <div className="pi__thumb">
                      <img src={rp.thumbnail} alt="" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
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
