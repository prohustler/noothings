import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  post: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    thumbnail: string;
    category: {
      name: string;
      slug: string;
    };
    date: string;
    readTime?: string;
  };
  variant?: "default" | "compact" | "featured";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const categoryColors: Record<string, string> = {
    info: "badge-info",
    tips: "badge-tips",
  };

  if (variant === "compact") {
    return (
      <Link href={`/${post.category.slug}/${post.slug}`} className="block group">
        <article className="flex gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors">
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-surface-muted">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-text line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h4>
            <span className="text-xs text-text-light mt-1">{post.date}</span>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/${post.category.slug}/${post.slug}`} className="block group">
        <article className="card overflow-hidden">
          <div className="aspect-[16/9] relative bg-surface-muted">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className={`badge ${categoryColors[post.category.slug] || "badge-info"} absolute top-3 left-3`}>
              {post.category.name}
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-text line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-text-muted line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-text-light">
              <span>{post.date}</span>
              {post.readTime && (
                <>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/${post.category.slug}/${post.slug}`} className="block group">
      <article className="card overflow-hidden flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="sm:w-48 sm:h-32 aspect-[16/9] sm:aspect-auto flex-shrink-0 relative bg-surface-muted">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`badge ${categoryColors[post.category.slug] || "badge-info"}`}>
                {post.category.name}
              </span>
            </div>
            <h3 className="text-base font-semibold text-text line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="mt-1.5 text-sm text-text-muted line-clamp-2 hidden sm:block">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-light mt-2">
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span>·</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
