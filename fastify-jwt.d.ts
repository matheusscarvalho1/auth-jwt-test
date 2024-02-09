
import { FastifyInstance } from "fastify";
import { FastifyJWTOptions } from "@fastify/jwt";

// Declaração de módulo para adicionar novos tipos ao Fastify
declare module "fastify" {
  // Define uma nova interface dentro do escopo do módulo fastify
  interface FastifyInstance {
    // Esta nova propriedade 'authenticate' é uma função que aceita opções opcionais e retorna uma Promise void
    authenticate: (options?: { secret?: string }) => Promise<void>;
  }
}
