import fastify from "fastify";
import routes from "./routes/routes";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

// Configurando o segredo para o JWT
const JWT_SECRET: string = "segredo_do_token";

// Registrando o plugin @fastify/jwt com a chave secreta
app.register(fastifyJwt, {
  secret: JWT_SECRET,
});

app.get("/", async () => {
  return "Hello World!";
});

// Registrando suas rotas
app.register(routes, { prefix: "app" });

// Iniciando o servidor
app.listen({ port: 3000, host: "0.0.0.0"}
 ).then(() => {
  console.log("HTTP Server running on http://localhost:3000");
});
