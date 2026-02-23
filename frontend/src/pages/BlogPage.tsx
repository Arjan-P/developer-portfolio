import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Post } from "@/types/posts";
import { PostCard } from "@/components/PostCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_DEV}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>
  return (
    <section className="content-page">
      <h1>Blog</h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
      >
        {[...posts]
          .sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map(post => (
            <PostCard key={post.id} post={post} />
          ))
        }
      </motion.div>
    </section>
  )
}
