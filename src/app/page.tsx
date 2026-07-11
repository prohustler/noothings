import Link from "next/link";
import { fetchPosts, categories } from "@/lib/wordpress";
import HomeClient from "@/components/HomeClient";

// 정적 생성 + ISR (60초마다 재생성)
export const revalidate = 60;
export const dynamic = 'force-static';

export default async function Home() {
  const posts = await fetchPosts(10);
  const trendingPosts = posts.slice(0, 4);

  return (
    <>
      <HomeClient categories={categories} />

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
                  className={cat.slug === "" ? "on" : ""}
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
            {/* Mobile Category Tiles */}
            <div className="mcats">
              {categories.map((cat) => (
                <Link key={cat.slug} href={cat.slug ? `/category/${cat.slug}` : "/"} className="mtile">
                  <div className="mtile__ico" style={{ background: `${cat.color}15`, color: cat.color }}>
                    {cat.icon}
                  </div>
                  <span className="mtile__lab">{cat.name}</span>
                </Link>
              ))}
            </div>

            {/* Feed Header */}
            <div className="feed__head">
              <div>
                <h1 className="feed__ttl">
                  최신 글
                  <small>총 {posts.length}개</small>
                </h1>
              </div>
            </div>

            {/* Post List */}
            <div className="plist">
              {posts.map((post) => (
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
              ))}
            </div>

            {/* Load More */}
            <div style={{ marginTop: "20px" }}>
              <button className="btn btn--soft btn--full">더 보기</button>
            </div>
          </main>

          {/* Right Rail */}
          <aside className="rail">
            {/* Trending */}
            <div className="panel">
              <div className="panel__k">🔥 인기 글</div>
              {trendingPosts.map((post, idx) => (
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
