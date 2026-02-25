import {postService} from "../utils/db.js";
import { exit } from "process";

const args = process.argv.slice(2); // skip first 2
if (args.length === 0) {
  console.error("Usage: ts-node script.ts <markdown-file-path>");
  process.exit(1);
}
const id = Number(args[0]);
if(!id) exit();

await postService.deletePost(id);
