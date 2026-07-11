import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPostsByCategory, categories } from "@/lib/wordpress";
import CategoryClient from "@/components/CategoryClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryInfo: Record<string, { name: string; icon: string; color: string; description: string }> = {
  info: {
    name: "정보",
    icon: "📚",
    color: "#00A676",
    description: "알아두면 쓸모있는 핵심 정보 모음",
  },
  tips: {
    name: "꿀팁",
    icon: "💡",
    color: "#FF6400",
    description: "일상에서 바로 쓸 수 있는 실용적인 팁",
  },
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const category = categoryInfo[decodedSlug];

  if (!category) {
    notFound();
  }

  const posts = await fetchPostsByCategory(decodedSlug, 20);

  return (
    <CategoryClient
      slug={decodedSlug}
      category={category}
      posts={posts}
      categories={categories}
    />
  );
}
