import { env } from "prisma/config";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient({
  accelerateUrl: env("DATABASE_URL"), // Add the required accelerateUrl property
  log: ['query', 'info', 'warn', 'error'], // Example configuration
});

async function main() {
  const users = await prisma.user.findMany(); // `user` テーブルを仮定
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });