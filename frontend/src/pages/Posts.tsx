import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import type { Post } from "../types/Post";
import MarkdownRendered from "../components/MarkdownRendered";

export default function Posts() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [])
  if (!post) return <section className="py-8">Loading...</section>;

  return (
    <section className="py-8">
      <div className="flex flex-col gap-5 my-2 divide-y divide-gray-asparagus-300">
        <h1>{post.title}</h1>
        <div>
          <MarkdownRendered markdown={post.contentMd} />
        </div>
        <Link to="/blog" className="link-underline">{`< Back`}</Link>
      </div>
    </section>
  )
}
