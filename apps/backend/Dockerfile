FROM node:20-alpine AS base
WORKDIR /app

# 1. Yarn / Turborepo 用のファイルをコピー
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# 2. ワークスペースの package.json をコピー（backend / frontend / prisma）
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json

# 3. 依存関係インストール（immutable を外す）
RUN corepack enable \
  && corepack prepare yarn@4.11.0 --activate \
  && yarn install          # ← ここも --immutable を削除

# 4. 残りのソースコードをまとめてコピー
COPY . .

# 5. backend をビルド
RUN yarn turbo run build --filter=backend...

# ランタイムイメージ
FROM node:20-alpine AS production
WORKDIR /app

# ビルド済み成果物と依存をコピー
COPY --from=base /app/apps/backend/dist ./dist
COPY --from=base /app/apps/backend/package.json ./
COPY --from=base /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/main.js"]