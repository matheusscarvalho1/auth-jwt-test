import { preValidationHookHandler } from "fastify";

export const authenticate: preValidationHookHandler = async (request, reply) => {
    try {
      // Verificando o token JWT antes de permitir o acesso à rota protegida
      await request.jwtVerify();
    } catch (error) {
      // Se houver erro na verificação do token, retorne uma mensagem de erro
      reply.code(401).send({ message: "Token JWT inválido ou ausente." });
    }
}