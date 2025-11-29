FROM node:20-alpine AS base
WORKDIR /app

# 1. Yarn が必要とする情報をすべてコピー
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# 2. すべてのワークスペースの package.json をコピー
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json

# 3. 依存関係インストール（immutable を外す）
RUN corepack enable \
  && corepack prepare yarn@4.11.0 --activate \
  && yarn install          # ← --immutable を削除

# 4. 残りのソースコードをまとめてコピー
COPY . .

# 5. Turborepo ビルド（frontend だけ）
RUN yarn turbo run build --filter=frontend...

FROM node:20-alpine AS production
WORKDIR /app

COPY --from=base /app/apps/frontend/.next ./.next
COPY --from=base /app/apps/frontend/package.json ./
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]