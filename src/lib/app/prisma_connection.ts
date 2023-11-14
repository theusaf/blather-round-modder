import { PrismaClient } from "@prisma/client";

export function getPrismaClient(): PrismaClient {
  const global = globalThis as unknown as { prisma?: PrismaClient };
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  return global.prisma;
}
