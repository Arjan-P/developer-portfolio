export async function getRepoLanguages(owner: string, repo: string) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
  );
  if (!res.ok) throw new Error("GitHub API error");
  return Object.keys(await res.json()) as string[];
}
