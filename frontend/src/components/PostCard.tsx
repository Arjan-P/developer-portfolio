import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react";

export function PostCard({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layoutId={`post-${id}`}
      className="cursor-pointer"
      onClick={() => navigate(`/blog/${id}`)}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
    >
      <Card onClick={() => navigate(`/blog/${id}`)} className="glass">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
