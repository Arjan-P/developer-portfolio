import express from "express";
import cors from "cors"
import { ENV } from "./config.js";
import postsRoutes from "./routes/posts.js";

const app = express();
const PORT = ENV.PORT;

app.use(cors());
app.use("/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Express app on port: ${PORT}`);
})
