import express from "express";
import cors from "cors";

import { ENV } from "./config.js";

import postsRoutes from "./modules/posts/posts.routes.js";
import projectsRoutes from "./modules/projects/projects.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRoutes);
app.use("/projects", projectsRoutes);
app.use(errorMiddleware);

app.listen(ENV.PORT, () => {
  console.log(`Express app on port: ${ENV.PORT}`);
});
