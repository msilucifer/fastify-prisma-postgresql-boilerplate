import Fastify from "fastify";
import cors from "@fastify/cors";
import { apiKeyAuth } from "./middleware/apiKeyAuth";
import userRoutes from "./routes/userRoutes";

async function build() {
  const fastify = Fastify({ logger: true });
  fastify.addHook("preHandler", apiKeyAuth);
  await fastify.register(cors, {
    origin: "*",
    allowedHeaders: ["*"],
  });
  fastify.register(userRoutes);
  return fastify;
}

const start = async () => {
  const port = process.env.PORT || 3000;

  try {
    const server = await build();
    await server.listen({ port: Number(port) });
    console.log(`Server is running at ${server.server.address()}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = build;

if (require.main === module) {
  start();
}
