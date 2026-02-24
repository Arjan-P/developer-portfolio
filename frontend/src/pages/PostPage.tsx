import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "@/components/Markdown";
import type { Post } from "@/types/posts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_DEV}/posts/${id}`)
    .then(res => res.json())
    .then(data => {
      setPost(data)
    });
  }, []);

  return (
      <Card className="glass no-hover">
        <CardHeader>
          <CardTitle>
            {
              post ? post.title : ""
            }
          </CardTitle>
          <CardDescription>
          {
            post
            ? new Date(post.createdAt).toLocaleDateString()
            : ""
          }
          </CardDescription>
        </CardHeader>
      <Separator />
        <CardContent>
            {
              post ? <Markdown content={post.content} />: ""
            }
        </CardContent>
      <Separator />
      <Button onClick={() => navigate("/blog")}
        className="mx-auto w-xl">Back</Button>
      </Card>
  )
}
