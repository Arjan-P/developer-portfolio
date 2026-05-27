export interface ParsedRepo {
  owner: string;
  repo: string;
}

export function parseGithubRepo(url: string): ParsedRepo | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(".git", "") };
}
