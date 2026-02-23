import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"; 
import { Markdown } from "./Markdown";
import type { Post } from "@/types/posts";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
  viewport: {margin: "-100px", amount: 0.3, once: false }
};

export function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  return (
    <motion.div variants={cardVariants} transition={{ duration: 0.5 }}>
    <Card onClick={() => navigate(`/blog/${post.id}`)} className="glass cursor-pointer">
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
