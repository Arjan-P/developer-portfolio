import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Post } from "@/types/posts";
import { Markdown } from "./Markdown";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/blog/${post.id}`)} className="glass cursor-pointer">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <Markdown content={post.content.substring(0, 50) + "..."} />
        </p>
      </CardContent>
    </Card>
  )
}
