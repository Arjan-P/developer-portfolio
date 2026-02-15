import express from "express";
import { ENV } from "./config.js";

const app = express();
const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`Express app on port: ${PORT}`);
})
