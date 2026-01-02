import { useState, useEffect } from "react"
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

export default function BlogHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  return (
    <section className="py-8">
      <h1 className="mb-6">Blog</h1>

        <div className="grid grid-cols-1 gap-5 divide-y divide-gray-asparagus-300">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
    </section>
  )
}
