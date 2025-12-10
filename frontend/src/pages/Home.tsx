import { useState, useEffect } from "react"
import PostCard from "../components/PostCard"; 
import type { Post } from "../types/Post";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/api/posts")
    .then(res => res.json())
    .then(data => setPosts(data));
  }, []);
  return (
    <div>
      <h1>Blog Home</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map(post => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
