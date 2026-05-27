import fs from "fs";
import path from "path";
import { processMarkdown } from "./uploadPost.js"; // reuse if you export it
import prisma from "../prisma.js";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error("Usage: ts-node updatePost.ts <id> [title] [markdown-file]");
    process.exit(1);
  }

  const id = Number(args[0]);
  const title = args[1];
  const markdownFile = args[2];

  console.log(`ID: ${id}`);
  console.log(`Title: ${title}`);
  console.log(`File: ${markdownFile}`);

  if (isNaN(id)) {
    console.error("Invalid post id:", args[0]);
    process.exit(1);
  }
  let content: string | undefined;

  // If markdown file is provided → process it
  if (markdownFile) {
    await processMarkdown(markdownFile);

    const outputPath = markdownFile.replace(/\.md$/, "-s3.md");
    content = fs.readFileSync(outputPath, "utf-8");
  }

  // Build update payload dynamically
  const updateData: {
    title?: string;
    content?: string;
  } = {};

  if (title) updateData.title = title;
  if (content) updateData.content = content;

  if (Object.keys(updateData).length === 0) {
    console.error("Nothing to update");
    process.exit(1);
  }

  await prisma.post.update({
    where: { id },
    data: updateData
  });

  console.log("Post updated");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });
}
