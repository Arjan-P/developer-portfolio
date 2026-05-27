import type { Projects } from "@prisma/client";
import prisma from "../../prisma.js";

async function getProjects(): Promise<Projects[]> {
  return prisma.projects.findMany();
}

export const projectsService = {
  getProjects,
};
