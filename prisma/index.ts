import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  console.log('tested', allUsers);
}
