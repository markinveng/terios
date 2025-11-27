import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "packages/prisma/schema.prisma",
  migrations: {
    path: "packages/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL")
  },
});
