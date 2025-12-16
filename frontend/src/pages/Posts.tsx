import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Post } from "../types/Post";
import MarkdownRendered from "../components/MarkdownRendered";

export default function Posts() {
  const {id} = useParams();
  const [post, setPost] = useState<Post>();  
  useEffect(()=> {
    fetch(`/api/posts/${id}`)
    .then(res => res.json())
    .then(data => setPost(data));
  }, [])
  if(!post) return <section className="py-8">Loading...</section>;
  
  return (
    <section className="py-8">
      <h1>{post.title}</h1>
      <MarkdownRendered  markdown={post.contentMd} />
    </section>
  )
}
