import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // Connect the client
  await prisma.$connect();
}
