import { PostCard } from "@/components/PostCard";
import { useEffect, useState } from "react";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_DEV}/posts`)
    .then(res => res.json())
    .then(data => {
      setPosts(data)
      setLoading(false);
    });
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <section className="content-page">
      <h1>Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {posts.map(post => (
          <PostCard post={post} />
        ))}
      </div>
    </section>
  )
}
