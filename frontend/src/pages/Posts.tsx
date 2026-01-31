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
      <div className="flex flex-col divide-y divide-gray-asparagus-300">
        <div className="pb-6">
          <h1>{post.title}</h1>
        </div>

        <div className="py-6">
          <MarkdownRendered markdown={post.contentMd} />
        </div>

        <div className="pt-6">
          <Link to="/blog" className="link-underline">
            &lt; Back
          </Link>
        </div>
      </div>
    </section>
  )
}
