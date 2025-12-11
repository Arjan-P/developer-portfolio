import dotenv from "dotenv";
import path from "path";

// load .env from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

export interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  HASHED_PASSWORD: string;
}

export const ENV: EnvConfig = {
  PORT: process.env.PORT ?? "3000",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "jwt_secret",
  HASHED_PASSWORD: process.env.HASHED_PASSWORD ?? "",
};
