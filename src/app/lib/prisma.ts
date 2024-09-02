import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {prisma : PrismaClient};

let prisma : PrismaClient;

if(globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  prisma = new PrismaClient();
}

export { prisma };
