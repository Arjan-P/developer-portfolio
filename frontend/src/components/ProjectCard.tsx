import { motion } from "motion/react";
import type { Project } from "@/types/projects";
import { useEffect, useState } from "react";
import { CardSkeleton } from "./CardSkeleton";

interface ParsedRepo {
  owner: string;
  repo: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
  viewport: { margin: "-100px", amount: 0.3, once: false }
};

function parseGithubRepo(url: string): ParsedRepo | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return null;

  return {
    owner: match[1],
    repo: match[2].replace(".git", "")
  };
}

export function ProjectCard({ project }: { project: Project }) {
  const [languages, setLanguages] = useState<string[]>([]);
  const [parsedRepo, setParsedRepo] = useState<ParsedRepo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const parsed = parseGithubRepo(project.repo);
    if (!parsed) return;

    setParsedRepo(parsed);
    setLoading(true);

    fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}/languages`)
      .then(res => res.json())
      .then(data => {
        setLanguages(Object.keys(data));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

  }, [project.repo]);

  return (
    <motion.div variants={cardVariants} transition={{ duration: 0.5 }}>
      {loading ? (<CardSkeleton />) : (<div onClick={() => window.location.href = project.repo} className="glass cursor-pointer h-full flex flex-col overflow-hidden">
        <div className="h-1/2 w-full">
          <img
            src={project.img_url}
            className="w-full h-full object-cover"
            alt={parsedRepo?.repo}
          />
        </div>

        <div className="h-1/2 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              {parsedRepo?.repo}
            </h3>
          </div>

          <div className="mt-2 flex gap-2 flex-wrap">
            {languages.map(lang => (
              <span
                key={lang}
                className="text-xs px-2 py-1 bg-muted rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>)}
    </motion.div>
  )
}

