import dotenv from "dotenv";
import path from "path";

// load .env from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

export interface EnvConfig {
  PORT: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  S3_BUCKET_NAME: string;
  S3_BUCKET_REGION: string;
}

export const ENV: EnvConfig = {
  PORT: process.env.PORT ?? "3000",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME ?? "",
  S3_BUCKET_REGION: process.env.S3_BUCKET_REGION ?? "",
};
