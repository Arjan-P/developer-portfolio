import dotenv from "dotenv";
import path from "path";

// load .env from project root
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

export interface EnvConfig {
  PORT: string;
}

export const ENV: EnvConfig = {
  PORT: process.env.PORT ?? "3000",
};
