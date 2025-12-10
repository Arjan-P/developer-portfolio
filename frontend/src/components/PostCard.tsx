import { Link } from "react-router-dom";
import type { Post } from "../types/Post"; 

interface PostCardProp {
  post: Post;
}

export default function PostCard({post}: PostCardProp) {
  return (
    <div
      style={{
        padding: 15,
        marginBottom: 15,
        border: "1px solid #ddd",
        borderRadius: 8
      }}
    >
      <h2>{post.title}</h2>
      <p>{post.content.substring(0, 80)}...</p>

      <Link to={`/posts/${post.id}`}>Read more →</Link>
    </div>
  )
}
