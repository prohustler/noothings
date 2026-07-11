// WordPress REST API

export interface WPPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: {
    name: string;
    slug: string;
  };
  date: string;
  link: string;
}

export interface WPCategory {
  name: string;
  slug: string;
  icon: string;
  color: string;
}

export const categories: WPCategory[] = [
  { name: "전체", slug: "", icon: "🏠", color: "#2E6BF6" },
  { name: "정보", slug: "info", icon: "📚", color: "#00A676" },
  { name: "꿀팁", slug: "tips", icon: "💡", color: "#FF6400" },
];

const WP_API_URL = "https://wp.noothings.kr/wp-json/wp/v2";

// 카테고리 ID 매핑 (WordPress term_id)
const categoryIdMap: Record<number, { name: string; slug: string }> = {
  3: { name: "정보", slug: "info" },
  5: { name: "꿀팁", slug: "tips" },
};

// HTML 태그 제거
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// 상대 시간 변환
function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  return date.toLocaleDateString("ko-KR");
}

// WordPress API 응답을 WPPost로 변환
interface WPApiPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  link: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

function transformPost(apiPost: WPApiPost): WPPost {
  const categoryId = apiPost.categories[0] || 3;
  const category = categoryIdMap[categoryId] || { name: "정보", slug: "info" };

  // 썸네일: _embedded에서 가져오거나 본문 첫 이미지
  let thumbnail = "";
  if (apiPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    thumbnail = apiPost._embedded["wp:featuredmedia"][0].source_url;
  } else {
    const imgMatch = apiPost.content.rendered.match(/<img[^>]+src=["']([^"']+)["']/);
    thumbnail = imgMatch?.[1] || `https://picsum.photos/seed/${apiPost.id}/400/300`;
  }

  return {
    id: String(apiPost.id),
    slug: apiPost.slug,
    title: stripHtml(apiPost.title.rendered),
    excerpt: stripHtml(apiPost.excerpt.rendered).slice(0, 150) +
             (stripHtml(apiPost.excerpt.rendered).length > 150 ? "..." : ""),
    content: apiPost.content.rendered,
    thumbnail,
    category,
    date: getRelativeTime(apiPost.date),
    link: apiPost.link,
  };
}

// REST API에서 포스트 가져오기
export async function fetchPosts(limit: number = 10): Promise<WPPost[]> {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?per_page=${limit}&_embed=wp:featuredmedia`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const apiPosts: WPApiPost[] = await response.json();
    return apiPosts.map(transformPost);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// 카테고리별 포스트 가져오기
export async function fetchPostsByCategory(categorySlug: string, limit: number = 10): Promise<WPPost[]> {
  try {
    // slug로 카테고리 ID 찾기
    const categoryId = Object.entries(categoryIdMap).find(
      ([, cat]) => cat.slug === categorySlug
    )?.[0];

    if (!categoryId) {
      return [];
    }

    const response = await fetch(
      `${WP_API_URL}/posts?categories=${categoryId}&per_page=${limit}&_embed=wp:featuredmedia`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts by category");
    }

    const apiPosts: WPApiPost[] = await response.json();
    return apiPosts.map(transformPost);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

// slug를 WordPress sanitize_title 형식으로 변환 (소문자 URL 인코딩)
function sanitizeSlug(slug: string): string {
  // 이미 URL 인코딩된 경우 먼저 디코딩
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // 디코딩 실패 시 그대로 사용
  }
  // 한글 등 비-ASCII 문자를 소문자 URL 인코딩으로 변환
  return encodeURIComponent(decoded).toLowerCase();
}

// 단일 포스트 가져오기 (slug로)
export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const sanitizedSlug = sanitizeSlug(slug);
    const response = await fetch(
      `${WP_API_URL}/posts?slug=${sanitizedSlug}&_embed=wp:featuredmedia`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const apiPosts: WPApiPost[] = await response.json();

    if (apiPosts.length === 0) {
      return null;
    }

    return transformPost(apiPosts[0]);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// 관련 포스트 가져오기
export async function fetchRelatedPosts(categorySlug: string, currentSlug: string, limit: number = 3): Promise<WPPost[]> {
  try {
    const categoryId = Object.entries(categoryIdMap).find(
      ([, cat]) => cat.slug === categorySlug
    )?.[0];

    if (!categoryId) {
      return [];
    }

    const response = await fetch(
      `${WP_API_URL}/posts?categories=${categoryId}&per_page=${limit + 1}&_embed=wp:featuredmedia`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch related posts");
    }

    const apiPosts: WPApiPost[] = await response.json();
    return apiPosts
      .filter((post) => post.slug !== currentSlug)
      .slice(0, limit)
      .map(transformPost);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}
