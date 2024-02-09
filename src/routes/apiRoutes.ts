import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { authenticate } from "../middlewares/validacao-jwt";

export default async function Routes(app: FastifyInstance) {
  // Rota de login para autenticar o usuário e gerar um token JWT
  app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    // Aqui você autenticaria o usuário (neste exemplo, estamos simulando uma autenticação bem-sucedida)
    const user = { id: 1, username: "example" };

    // Gerar um token JWT para o usuário autenticado
    const token = app.jwt.sign({ user });

    reply.status(200).send({ token });
  });

  // Rota protegida que requer autenticação
  app.get(
    "/protected",
    { preValidation: authenticate },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.status(200).send({ message: "Esta rota é protegida - JWT." });
    }
  );

  // Rota de teste para visualizar o token JWT (opcional)
  app.get(
    "/test-token",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Visualizar o token JWT extraído da solicitação
      reply.status(200).send ({ token: request.headers.authorization });
    }
  );
}
