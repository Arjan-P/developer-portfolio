import { useEffect, useState } from "react"
import { motion } from "motion/react";
import type { Project } from "@/types/projects"
import { ProjectCard } from "@/components/ProjectCard";


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL_DEV}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
  }, []);
  if (loading) return <p>Loading...</p>
  return (
    <section className="content-page">
      <h1>About</h1>

      <h2>Projects</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="grid grid-cols-4 sm:grid-cols-8 gap-6 sm:gap-8"
      >
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  )
}
