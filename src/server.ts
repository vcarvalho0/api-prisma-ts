import "./config/module-alias";
import express from "express";
import cors from "cors";
import ENV from "./env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(ENV.Application.PORT, () => {
  console.log(`🚀 Server is running at ${ENV.Application.PORT}`);
});
