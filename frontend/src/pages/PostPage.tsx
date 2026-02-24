import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Markdown } from "@/components/Markdown";
import type { Post } from "@/types/posts";
import { Separator } from "@/components/ui/separator";

export function PostPage() {
  const { id } = useParams();
  
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
      </Card>
  )
}
