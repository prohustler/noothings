import { NextResponse } from 'next/server';

const WP_API_URL = "https://wp.noothings.kr/wp-json/wp/v2";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || '무궁화호-좌석-배치도';

  const sanitizedSlug = sanitizeSlug(slug);
  const apiUrl = `${WP_API_URL}/posts?slug=${sanitizedSlug}&_embed=wp:featuredmedia`;

  try {
    const response = await fetch(apiUrl, { cache: 'no-store' });
    const data = await response.json();

    return NextResponse.json({
      input_slug: slug,
      sanitized_slug: sanitizedSlug,
      api_url: apiUrl,
      response_status: response.status,
      posts_count: data.length,
      first_post: data[0] ? {
        id: data[0].id,
        slug: data[0].slug,
        title: data[0].title.rendered,
        categories: data[0].categories,
      } : null,
    });
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      input_slug: slug,
      sanitized_slug: sanitizedSlug,
      api_url: apiUrl,
    }, { status: 500 });
  }
}
