import express from "express";
import { ENV } from "./config/env.js";
import pageRoutes from "./routes/pages.js";
import loginRoutes from "./routes/login.js";

const app = express();

app.use(express.json());
app.use("/login", loginRoutes);
app.use("/posts", pageRoutes);

app.listen(ENV.PORT, () => {
  console.log(`app listening on port: ${ENV.PORT}`);
});
