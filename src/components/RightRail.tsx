import { PostCard } from "./PostCard";

// Mock data - will be replaced with WordPress API
const recentPosts = [
  {
    id: 1,
    slug: "에어컨-전기세-절약",
    title: "에어컨 하루종일 틀어도 전기세 적게 나오는 방법",
    excerpt: "",
    thumbnail: "/placeholder.jpg",
    category: { name: "꿀팁", slug: "tips" },
    date: "2일 전",
  },
  {
    id: 2,
    slug: "택배-분실-보상",
    title: "택배 분실됐을 때 100% 보상받는 법",
    excerpt: "",
    thumbnail: "/placeholder.jpg",
    category: { name: "정보", slug: "info" },
    date: "3일 전",
  },
  {
    id: 3,
    slug: "곰팡이-제거-재발-방지",
    title: "곰팡이 아무리 닦아도 다시 생기는 이유",
    excerpt: "",
    thumbnail: "/placeholder.jpg",
    category: { name: "꿀팁", slug: "tips" },
    date: "5일 전",
  },
];

export function RightRail() {
  return (
    <div className="space-y-6">
      {/* Recent Posts */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          최근 글
        </h3>
        <div className="space-y-1">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} variant="compact" />
          ))}
        </div>
      </div>

      {/* Newsletter or CTA */}
      <div className="card p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <h3 className="text-sm font-semibold text-text mb-2">
          새 글 알림 받기
        </h3>
        <p className="text-xs text-text-muted mb-3">
          유용한 생활 정보를 놓치지 마세요
        </p>
        <button className="w-full btn btn-primary text-sm">
          구독하기
        </button>
      </div>

      {/* About Widget */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-text-muted mb-2">
          누띵즈 소개
        </h3>
        <p className="text-xs text-text-muted leading-relaxed">
          한국 생활에 필요한 꿀팁과 정보를 쉽고 명확하게 정리합니다.
          에어컨 전기세부터 택배 분실 대처법까지, 읽고 나면 하나라도 정확히 알게 되는 글을 씁니다.
        </p>
      </div>

      {/* Footer Links */}
      <div className="px-2 text-xs text-text-light space-y-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="/about" className="hover:text-text">소개</a>
          <a href="/privacy" className="hover:text-text">개인정보처리방침</a>
          <a href="/contact" className="hover:text-text">문의</a>
        </div>
        <p>© 2024 누띵즈. All rights reserved.</p>
      </div>
    </div>
  );
}
