import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/Markdown";

import { usePost } from "@/features/posts/hooks/usePost";

export function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = usePost(id ?? "");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Post not found.</p>;

  return (
    <Card className="glass no-hover">
      <CardHeader>
        <CardTitle>{post?.title}</CardTitle>
        <CardDescription>
          {post ? new Date(post.createdAt).toLocaleDateString() : ""}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>{post && <Markdown content={post.content} />}</CardContent>
      <Separator />
      <Button onClick={() => navigate("/blog")} className="mx-auto max-w-3sm">
        Back
      </Button>
    </Card>
  );
}
