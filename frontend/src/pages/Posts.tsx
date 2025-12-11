import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import type { Post } from "../types/Post";

export default function Posts() {
  const {id} = useParams();
  const [post, setPost] = useState<Post>();  
  useEffect(()=> {
    fetch(`/api/posts/${id}`)
    .then(res => res.json())
    .then(data => setPost(data));
  }, [])
  if(!post) return <p>Loading...</p>;
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        {post.content}
      </p>
      <Link to={'/'}>Back to Home</Link>
    </div>
  )
}
