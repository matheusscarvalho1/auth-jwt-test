import { FastifyInstance } from "fastify";
import { FastifyJWTOptions } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (options?: { secret?: string }) => Promise<void>;
  }
}
