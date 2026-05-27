import { motion } from "motion/react";

import { useProjects } from "@/features/projects/hooks/useProjects";
import { ProjectCard } from "@/features/projects/components/ProjectCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function HomePage() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load projects.</p>;

  return (
    <section className="content-page">
      <h1>About</h1>

      <h2>Projects</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8"
      >
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
