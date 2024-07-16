import { FastifyReply, FastifyRequest } from "fastify";

export async function apiKeyAuth(request: FastifyRequest, reply: FastifyReply) {
  const apiKey = request.headers["x-api-key"];

  if (apiKey !== process.env.EXPECTED_API_KEY) {
    reply.code(401).send({ message: "Unauthorized" });
  }
}
