import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";
import type { Post } from "@/types/posts";

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_DEV}/posts`)
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    });
  }, []);
  return (
    <section className="content-page">
      <h1>Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
