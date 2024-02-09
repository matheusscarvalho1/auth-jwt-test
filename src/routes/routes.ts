import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  preValidationHookHandler,
} from "fastify";

export default async function Routes(app: FastifyInstance) {
  // Rota de login para autenticar o usuário e gerar um token JWT
  app.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    // Aqui você autenticaria o usuário (neste exemplo, estamos simulando uma autenticação bem-sucedida)
    const user = { id: 1, username: "example" };

    // Gerar um token JWT para o usuário autenticado
    const token = app.jwt.sign({ user });

    return { token };
  });

  // Rota protegida que requer autenticação
  app.get(
    "/protected",
    { preValidation: authenticate },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { message: "Esta rota é protegida." };
    }
  );

  // Rota de teste para visualizar o token JWT (opcional)
  app.get(
    "/test-token",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Visualizar o token JWT extraído da solicitação
      return { token: request.headers.authorization };
    }
  );
}

const authenticate: preValidationHookHandler = async (request, reply) => {
  try {
    // Verifique o token JWT antes de permitir o acesso à rota protegida
    await request.jwtVerify();
  } catch (err) {
    // Se houver erro na verificação do token, retorne uma mensagem de erro
    reply.code(401).send({ message: "Token JWT inválido ou ausente." });
  }
};
