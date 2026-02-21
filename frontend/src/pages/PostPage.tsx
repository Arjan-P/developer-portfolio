import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <motion.div
      layoutId={`post-${id}`}
      className="cursor-pointer content-page"
      onClick={() => navigate(`/blog/${id}`)}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      <Card onClick={() => navigate(`/blog/${id}`)} className="w-full h-full glass no-hover">
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
  // return (
  //   <section className="content-page">
  //     <motion.div
  //       className="glass no-hover w-full max-w-4xl mx-auto"
  //       layout
  //       layoutId={`post-${id}`}
  //       transition={{
  //         layout: { duration: 2.5, type: "spring" }
  //       }}
  //     >
  //       <h1>Post {id}</h1>
  //       <p>Full post content here...</p>
  //     </motion.div>
  //   </section>
  // );
}
