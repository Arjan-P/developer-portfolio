import { api } from "./client";

import type { SuccessResponse } from "./response";

import type { Project } from "@/features/projects/types";

export async function getProjects() {
  const res = await api.get<
    SuccessResponse<Project[]>
  >("/projects");

  return res.data.data;
}
