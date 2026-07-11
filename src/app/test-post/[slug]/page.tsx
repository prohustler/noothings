import { fetchPostBySlug } from "@/lib/wordpress";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TestPostPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await fetchPostBySlug(decodedSlug);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Test Post Page</h1>
      <p><strong>Raw slug from URL:</strong> {slug}</p>
      <p><strong>Decoded slug:</strong> {decodedSlug}</p>
      <p><strong>Post found:</strong> {post ? 'Yes' : 'No'}</p>
      {post && (
        <>
          <p><strong>Post ID:</strong> {post.id}</p>
          <p><strong>Post Title:</strong> {post.title}</p>
          <p><strong>Post Slug:</strong> {post.slug}</p>
          <p><strong>Category:</strong> {post.category.name} ({post.category.slug})</p>
        </>
      )}
    </div>
  );
}
