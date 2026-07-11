import Link from "next/link";

const categories = [
  { name: "전체", slug: "", icon: "🏠", count: 45 },
  { name: "정보", slug: "info", icon: "📚", count: 28 },
  { name: "꿀팁", slug: "tips", icon: "💡", count: 17 },
];

const popularTags = [
  { name: "에어컨", slug: "에어컨", count: 8 },
  { name: "전기세", slug: "전기세", count: 6 },
  { name: "택배", slug: "택배", count: 5 },
  { name: "곰팡이", slug: "곰팡이", count: 4 },
  { name: "여름", slug: "여름", count: 4 },
  { name: "청소", slug: "청소", count: 3 },
];

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3">카테고리</h3>
        <nav className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug ? `/category/${cat.slug}` : "/"}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-surface-hover transition-colors group"
            >
              <span className="flex items-center gap-2">
                <span>{cat.icon}</span>
                <span className="text-sm text-text group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </span>
              <span className="text-xs text-text-light bg-surface-muted px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Popular Tags */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3">인기 태그</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tag/${tag.slug}`}
              className="px-3 py-1.5 text-xs bg-surface-muted text-text-muted rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3">바로가기</h3>
        <nav className="space-y-1">
          <Link
            href="/about"
            className="block px-3 py-2 text-sm text-text-muted hover:text-primary rounded-lg hover:bg-surface-hover transition-colors"
          >
            사이트 소개
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-sm text-text-muted hover:text-primary rounded-lg hover:bg-surface-hover transition-colors"
          >
            문의하기
          </Link>
        </nav>
      </div>
    </div>
  );
}
