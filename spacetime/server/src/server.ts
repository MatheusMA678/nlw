import "dotenv/config";
import fastify from "fastify";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";

import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();
const port = Number(process.env.PORT)

app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});
app.register(multipart);
app.register(cors, {
  origin: true,
});
app.register(jwt, {
  secret: "spacetime",
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

app.listen({
  port,
}).then(() => console.log(`Running succesfully on port ${port}`));

export default app
