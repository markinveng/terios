FROM node:20-bullseye-slim

WORKDIR /app

# Prisma が動くための最低限の依存
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates openssl bash curl python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# ルートの依存情報のみコピー（Yarn 4 設定も）
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Prisma ワークスペースだけコピー
COPY packages/prisma ./packages/prisma

WORKDIR /app/packages/prisma

# ビルド時はダミーの DATABASE_URL を指定して generate だけ通す
RUN corepack enable \
  && corepack prepare yarn@4.11.0 --activate \
  && DATABASE_URL="postgresql://user:pass@localhost:5432/db" \
      yarn install --inline-builds \
  && DATABASE_URL="postgresql://user:pass@localhost:5432/db" \
      npx prisma generate --schema schema.prisma

CMD ["yarn", "studio"]