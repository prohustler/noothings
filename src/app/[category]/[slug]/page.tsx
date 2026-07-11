import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchRelatedPosts, categories } from "@/lib/wordpress";
import PostClient from "@/components/PostClient";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// HTML에서 H2 태그를 추출하여 TOC 생성
function extractToc(html: string): { id: string; title: string }[] {
  const toc: { id: string; title: string }[] = [];
  const h2Regex = /<h2[^>]*id=["']([^"']+)["'][^>]*>([^<]+)<\/h2>/gi;
  let match;

  while ((match = h2Regex.exec(html)) !== null) {
    toc.push({
      id: match[1],
      title: match[2].trim(),
    });
  }

  // id가 없는 h2도 찾기
  if (toc.length === 0) {
    const h2SimpleRegex = /<h2[^>]*>([^<]+)<\/h2>/gi;
    let index = 0;
    while ((match = h2SimpleRegex.exec(html)) !== null) {
      const id = `section-${index}`;
      toc.push({
        id,
        title: match[1].trim(),
      });
      index++;
    }
  }

  return toc;
}

// H2에 id 추가
function addIdsToHeadings(html: string): string {
  let index = 0;
  return html.replace(/<h2([^>]*)>([^<]+)<\/h2>/gi, (match, attrs, text) => {
    if (attrs.includes('id=')) {
      return match;
    }
    const id = `section-${index}`;
    index++;
    return `<h2${attrs} id="${id}">${text}</h2>`;
  });
}

export default async function PostPage({ params }: PageProps) {
  const { category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const decodedCategory = decodeURIComponent(category);

  const post = await fetchPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  // 카테고리 확인
  if (post.category.slug !== decodedCategory) {
    notFound();
  }

  const relatedPosts = await fetchRelatedPosts(decodedCategory, decodedSlug, 3);

  // H2에 id 추가하고 TOC 생성
  const contentWithIds = addIdsToHeadings(post.content);
  const toc = extractToc(contentWithIds);

  // post.content를 id가 추가된 버전으로 업데이트
  const postWithIds = {
    ...post,
    content: contentWithIds,
  };

  return <PostClient post={postWithIds} relatedPosts={relatedPosts} categories={categories} toc={toc} />;
}
