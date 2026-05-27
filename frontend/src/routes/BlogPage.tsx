import { MotionGrid } from "@/components/MotionGrid";

import { usePosts } from "@/features/posts/hooks/usePosts";
import { PostCard } from "@/features/posts/components/PostCard";
import { useEffect } from "react";

export function BlogPage() {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load posts.</p>;
  useEffect(() => {
    document.title = "Blog | Arjan";
  }, []);
  return (
    <section className="content-page">
      <h1>Blog</h1>

      <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {[...(posts ?? [])]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
      </MotionGrid>
    </section>
  );
}
