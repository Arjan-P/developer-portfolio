import { useEffect } from "react";

import { useProjects } from "@/features/projects/hooks/useProjects";
import { ProjectsCarousel } from "@/features/projects/components/ProjectsCarousel";

export function HomePage() {
  const { data: projects, isLoading, isError } = useProjects();

  useEffect(() => {
    document.title = "Home | Arjan";
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Failed to load projects.</p>;

  return (
    <section className="content-page">
      <h1>About</h1>

      <div className="space-y-6">
        <h2>Projects</h2>

        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            {projects && <ProjectsCarousel projects={projects} />}
          </div>
        </div>
      </div>
    </section>
  );
}
