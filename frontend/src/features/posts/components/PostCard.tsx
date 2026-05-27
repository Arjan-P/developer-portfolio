import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Markdown } from "@/components/Markdown";

import type { Post } from "../types";
import { MotionItem } from "@/components/MotionItem";

export function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <MotionItem>
      <Card
        onClick={() => navigate(`/blog/${post.id}`)}
        className="glass cursor-pointer h-full flex flex-col"
      >
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {new Date(post.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Markdown
            content={post.content.split("\n")[0].substring(0, 50) + "..."}
          />
        </CardContent>
      </Card>
    </MotionItem>
  );
}
