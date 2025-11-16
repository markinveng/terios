import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

export async function setupTestDatabase() {
  // テスト用のデータベースを初期化するロジック
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Goal" CASCADE;`;
}

export default prisma;