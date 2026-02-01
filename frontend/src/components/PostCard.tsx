import { Link } from "react-router-dom";
import type { Post } from "../types/Post";
import MarkdownRendered from "./MarkdownRendered";

interface PostCardProp {
  post: Post;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default function PostCard({ post }: PostCardProp) {
  console.log(typeof post.createdAt);
  return (
    <article>
      <div className="flex flex-col gap-2 my-2">
        <div className="flex flex-row items-center justify-between">
          <h2>{post.title}</h2>
          <time dateTime={post.createdAt} className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </time>
        </div>
        <MarkdownRendered markdown={post.contentMd.substring(0, 80) + "..."} />
        <Link
          to={`/blog/posts/${post.id}`}
          className="link-underline"
        >Read more →
        </Link>
      </div>
    </article>
  )
}
