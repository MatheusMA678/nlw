import "dotenv/config";
import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";

import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";

import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();
const port = Number(process.env.PORT)

export default async function (instance: FastifyInstance, opts: FastifyServerOptions) {
  instance.register(require("@fastify/static"), {
    root: resolve(__dirname, "../uploads"),
    prefix: "/uploads",
  });
  instance.register(multipart);
  instance.register(cors, {
    origin: true,
  });
  instance.register(jwt, {
    secret: "spacetime",
  });

  instance.register(authRoutes);
  instance.register(uploadRoutes);
  instance.register(memoriesRoutes);
}

