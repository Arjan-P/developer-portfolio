import express from "express";
import { ENV } from "./config.js";
import postsRoutes from "./routes/posts.js";

const app = express();
const PORT = ENV.PORT;

app.use("/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Express app on port: ${PORT}`);
})
