import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react";
import type {Post} from "../pages/BlogPage"
import { Markdown } from "./Markdown";

export function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layoutId={`post-${post.id}`}
      className="cursor-pointer"
      onClick={() => navigate(`/blog/${post.id}`)}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{new Date(post.createdAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Markdown content={post.content.substring(0, 50) + "..."} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
