import fastify from "fastify";
import apiRoutes from "./routes/apiRoutes";
import fastifyJwt from "@fastify/jwt";
import { env } from './env'

const app = fastify();

// Configurando o segredo para o JWT
const JWT_SECRET: string = env.JWT_SECRET;

// Registrando o plugin @fastify/jwt com a chave secreta
app.register(fastifyJwt, {
  secret: JWT_SECRET,
  sign: { expiresIn: '1d' },
});

app.get("/", async () => {
  return "Rotas disponíveis para o teste do token: [POST]/api/login, [GET]/api/protected, [GET]/api/test-token";
});

// Registrando suas rotas
app.register(apiRoutes, { prefix: "api" });

// Iniciando o servidor
app.listen({ port: 3000, host: "localhost" })
  .then(() => {
    console.log(`HTTP Server running on http://localhost:3000`);
  })
  .catch(error => {
    console.error("Error starting server:", error);
    process.exit(1);
  });
