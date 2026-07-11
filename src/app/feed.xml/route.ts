import { NextResponse } from "next/server";

// Mock posts data (same as other pages)
const allPosts = [
  {
    id: 1,
    slug: "에어컨-전기세-절약",
    title: "에어컨 하루종일 틀어도 전기세 적게 나오는 방법",
    excerpt: "인버터 에어컨이면 하루 8시간 틀어도 월 3만원대예요. 근데 껐다 켜고 반복하면 오히려 더 나와요.",
    category: { name: "꿀팁", slug: "tips" },
    date: "2024-01-15",
  },
  {
    id: 2,
    slug: "택배-배송완료-안옴",
    title: "택배 배송완료 안옴 이럴 때 바로 해야 할 3가지",
    excerpt: "배송완료 문자 받았는데 택배가 없어요. 24시간 안에 이것부터 하세요.",
    category: { name: "정보", slug: "info" },
    date: "2024-01-14",
  },
  {
    id: 3,
    slug: "곰팡이-제거-재발-방지",
    title: "곰팡이 아무리 닦아도 다시 생기는 이유",
    excerpt: "락스는 표면만 죽여요. 뿌리가 살아있거든요. 과탄산소다 + 밀봉이 핵심입니다.",
    category: { name: "꿀팁", slug: "tips" },
    date: "2024-01-13",
  },
  {
    id: 4,
    slug: "열대야-에어컨-온도",
    title: "열대야에 에어컨 몇 도 맞추고 자야 안 춥고 전기세 안 나오나",
    excerpt: "26도 냉방이 정답이 아닐 수 있어요. 습도까지 고려한 최적 설정.",
    category: { name: "꿀팁", slug: "tips" },
    date: "2024-01-12",
  },
  {
    id: 5,
    slug: "냉장고-전기세-왜",
    title: "냉장고 전기세 왜 많이 나올까 월 5천원 더 나오는 습관",
    excerpt: "냉장고는 24시간 돌아가니까 작은 습관 하나가 전기세에 영향을 줘요.",
    category: { name: "정보", slug: "info" },
    date: "2024-01-11",
  },
  {
    id: 6,
    slug: "전세-월세-계약서-확인",
    title: "전세 월세 계약서 이것만 확인하면 사기 안 당해요",
    excerpt: "등기부등본, 확정일자, 전입신고. 이 세 가지만 제대로 하면 됩니다.",
    category: { name: "정보", slug: "info" },
    date: "2024-01-10",
  },
  {
    id: 7,
    slug: "여름-신발-냄새-제거",
    title: "여름 신발 냄새 제거하는 확실한 방법",
    excerpt: "베이킹소다만으로는 부족해요. 냄새 원인부터 잡아야 합니다.",
    category: { name: "꿀팁", slug: "tips" },
    date: "2024-01-09",
  },
];

const SITE_URL = "https://noothings.kr";
const SITE_TITLE = "누띵즈";
const SITE_DESCRIPTION = "읽고 나면 하나라도 정확히 알게 되는 글";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRFC822Date(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

export async function GET() {
  const rssItems = allPosts
    .map((post) => {
      const postUrl = `${SITE_URL}/${post.category.slug}/${encodeURIComponent(post.slug)}/`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category.name)}</category>
      <pubDate>${formatRFC822Date(post.date)}</pubDate>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${formatRFC822Date(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
