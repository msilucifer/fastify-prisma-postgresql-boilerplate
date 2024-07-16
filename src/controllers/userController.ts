import { PrismaClient, Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

export async function createUser(request: FastifyRequest, _: FastifyReply) {
  const userData = request.body as Prisma.UserCreateInput;
  const user = await prisma.user.create({ data: userData });
  return user;
}
