import { MotionItem } from "@/components/MotionItem";

import type { Project } from "../types";

import { CardSkeleton } from "./CardSkeleton";

import { parseGithubRepo } from "../lib/github";
import { useRepoLanguages } from "../hooks/useRepoLanguages";

export function ProjectCard({ project }: { project: Project }) {
  const parsedRepo = parseGithubRepo(project.repo);

  const { data: languages = [], isLoading } = useRepoLanguages(
    parsedRepo?.owner,
    parsedRepo?.repo,
  );

  if (!parsedRepo) return null;

  return (
    <MotionItem>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div
          onClick={() => window.open(project.repo, "_blank")}
          className="glass cursor-pointer h-full flex flex-col overflow-hidden"
        >
          <div className="h-1/2 w-full">
            <img
              src={project.img_url}
              className="w-full h-full object-cover"
              alt={parsedRepo.repo}
            />
          </div>

          <div className="h-1/2 p-4 flex flex-col justify-between">
            <h3 className="font-semibold text-lg">{parsedRepo.repo}</h3>

            <div className="mt-2 flex gap-2 flex-wrap">
              {languages.map((lang) => (
                <span key={lang} className="text-xs px-2 py-1 bg-muted rounded">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </MotionItem>
  );
}
