import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import pageRoutes from "./routes/pages.js";
import loginRoutes from "./routes/login.js";

const app = express();
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
})

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/posts", pageRoutes);

app.listen(ENV.PORT, () => {
  console.log(`app listening on port: ${ENV.PORT}`);
});
