import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import service from "../utils/db.js";
import type { Post } from "@prisma/client";
import { ENV } from "../config.js";
import { exit } from "process";

// Configure your S3
const BUCKET_NAME = ENV.S3_BUCKET_NAME;
const REGION = ENV.S3_BUCKET_REGION;
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload a file to S3
async function uploadFileToS3(filePath: string): Promise<string> {
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const s3Key = `posts/${Date.now()}-${fileName}`; // avoid collisions

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
    Body: fileContent,
    ContentType: "image/" + path.extname(fileName).substring(1),
  });

  await s3.send(command);

  // Return public URL
  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`;
}

// Function to process markdown file
async function processMarkdown(filePath: string) {
  let markdown = fs.readFileSync(filePath, "utf-8");

  // Regex to match images: ![alt](path)
  const imageRegex = /!\[.*?\]\((.*?)\)/g;

  const matches = markdown.matchAll(imageRegex);

  for (const match of matches) {
    const localImagePath = match[1];

    // Skip URLs (already online)
    if(!localImagePath) continue;
    if (/^https?:\/\//.test(localImagePath)) continue;

    const absolutePath = path.resolve(path.dirname(filePath), localImagePath);

    if (!fs.existsSync(absolutePath)) {
      console.warn(`Image not found: ${absolutePath}`);
      continue;
    }

    const s3Url = await uploadFileToS3(absolutePath);

    // Replace local path with S3 URL
    markdown = markdown.replace(localImagePath, s3Url);
  }

  // Save updated markdown
  const outputPath = filePath.replace(/\.md$/, "-s3.md");
  fs.writeFileSync(outputPath, markdown, "utf-8");
  console.log(`Updated markdown saved to ${outputPath}`);
}

const args = process.argv.slice(2); // skip first 2
if (args.length === 0) {
  console.error("Usage: ts-node script.ts <markdown-file-path>");
  process.exit(1);
}

const title = args[0];
const markdownFile = args[1];
if(!title || !markdownFile) exit();
console.log("Markdown file path:", markdownFile);
processMarkdown(markdownFile).catch(console.error);
const content = fs.readFileSync(markdownFile.replace(/\.md$/, "-s3.md"), "utf-8");
await service.postPost({
  title,
  content
})
