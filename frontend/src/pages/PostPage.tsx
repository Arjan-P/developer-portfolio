import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "./BlogPage";
import { useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown";

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
    <motion.div
      layoutId={`post-${id}`}
      className="content-page"
      onClick={() => navigate(`/blog/${id}`)}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      <Card className="flex flex-col gap-3 w-full h-full glass no-hover">
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
        <CardContent>
          <p>
            {
              post ? <Markdown content={post.content} />: ""
            }
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
