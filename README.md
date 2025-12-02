# Terios 開発環境セットアップ手順

このリポジトリは、Next.js + Prisma + PostgreSQL を Docker 上で動かすモノレポプロジェクトです。  
ここでは、初めてプロジェクトをクローンしてローカル環境構築を行う手順を説明します。

---

## 1. 事前にインストールしておくソフトウェア

開発を始める前に、以下をインストールしてください。

### 必須

- **Git**
  - リポジトリをクローンするために使用します。
  - https://git-scm.com/

- **Node.js 20 系**
  - Prisma 7 / Next.js 16 の実行に使用します。
  - 推奨: `v20.19.0` 以上  
  - https://nodejs.org/

- **Corepack（Yarn 4 管理用）**
  - Node.js 20 には同梱されています。  
  - 有効化コマンドは後述します。

- **Docker Desktop**
  - アプリケーション / DB をコンテナ上で起動するために使用します。
  - Windows / macOS の方は Docker Desktop をインストールしてください。
  - https://www.docker.com/products/docker-desktop/

### 推奨

- **Visual Studio Code**
  - このプロジェクトは VS Code 前提で構成されています。
  - https://code.visualstudio.com/

---

## 2. GitHub からのクローン

1. 任意の作業ディレクトリで、次のコマンドを実行します。

   ```sh
   #HTTP
   git clone https://github.com/markinveng/terios.git
   #SSH
   git@github.com:markinveng/terios.git
   cd terios
   ```

2. VS Code で開く場合

   ```sh
   code .
   ```

---

## 3. パッケージマネージャの設定（Yarn 4）

このプロジェクトは Yarn 4 (`.yarnrc.yml`) を使用します。  
Corepack を使って Yarn 4.11.0 を有効化します。

```sh
corepack enable
corepack prepare yarn@4.11.0 --activate
```

続いて、依存パッケージをインストールします。

```sh
yarn install
```

> 注: lockfile を変更したくない場合は  
> `yarn install --immutable` を使っても構いません（既に同じ環境が整っている前提）。

---

## 4. 環境変数ファイルの準備

DB 接続などに使用する環境変数を `.env` に定義します。  
（コミットされていないため、自分で作成する必要があります）

プロジェクトルートに `.env` を作成し、少なくとも次を定義してください。

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
```

- `docker-compose.yml` の `db` サービスと合わせてあります。
- 実際のパスワードや DB 名を変更する場合は、`docker-compose.yml` と合わせて修正してください。

---

## 5. Docker を使ったバックエンド（DB / Prisma）起動

このプロジェクトでは、PostgreSQL と Prisma 用コンテナを Docker で起動できます。

### 5-1. Docker Desktop を起動

- Docker Desktop を立ち上げておきます（Windows / macOS）。
- `docker info` が正常に動く状態であることを確認してください。

### 5-2. コンテナのビルドと起動

プロジェクトルートで次を実行します。

```sh
# Prisma / frontend を含む全サービスのビルド
docker compose build

# コンテナの起動（バックグラウンド）
docker compose up -d
```

- 起動するサービス
  - `db`: PostgreSQL 15
  - `frontend`: Next.js アプリ（ポート 3000）
  - `prisma`: Prisma Studio 用コンテナ（`yarn studio` 実行）

コンテナの状態確認:

```sh
docker compose ps
```

不要になったら停止/削除:

```sh
docker compose down
```

---

## 6. Turborepo 経由のビルド・開発コマンド

ルートの [`package.json`](package.json) には、Turborepo 経由のスクリプトが定義されています。

### 6-1. 依存関係インストール（再掲）

```sh
yarn install
```

### 6-2. ビルド

モノレポ全体をビルドします。

```sh
yarn build
```

内部的には:

```sh
yarn turbo run build
```

が実行され、`apps/frontend` などで `build` タスクが走ります。

### 6-3. Lint

```sh
yarn lint
```

Next.js + ESLint 設定（[`apps/frontend/eslint.config.mjs`](apps/frontend/eslint.config.mjs)）に基づいてチェックが行われます。

### 6-4. 型チェック

```sh
yarn check-types
```

`turbo run check-types` により、TypeScript の型チェックが各パッケージで実行されます。


## 6-5. よく使うコマンド一覧

### ルート共通

- 依存関係インストール

  ```sh
  yarn install
  ```

- モノレポ全体のビルド

  ```sh
  yarn build           # = yarn turbo run build
  ```

- 開発サーバー（frontend + backend 同時起動）

  ```sh
  yarn dev             # = yarn turbo run dev
  ```

- Lint

  ```sh
  yarn lint            # = yarn turbo run lint
  ```

- 型チェック

  ```sh
  yarn check-types     # = yarn turbo run check-types
  ```

---

### フロントエンド（Next.js, `apps/frontend`）

- 開発サーバー（モノレポ経由）

  ```sh
  yarn dev             # ルートで実行 / http://localhost:3000
  ```

- フロントエンドだけ起動したい場合

  ```sh
  yarn workspace frontend dev
  # または
  cd apps/frontend
  yarn dev
  ```

---

### バックエンド（NestJS, `apps/backend`）

- 開発サーバー起動

  ```sh
  yarn workspace backend dev
  # または
  cd apps/backend
  yarn dev
  ```

  - ポート: `http://localhost:4000`
  - Prisma 用の `DATABASE_URL` などはルートの `.env` から読み込み

- 単体テスト

  ```sh
  yarn workspace backend test
  ```

- E2E テスト

  ```sh
  yarn workspace backend test:e2e
  ```

---

### Prisma（`packages/prisma`）

- Prisma Client の生成

  ```sh
  cd packages/prisma
  yarn generate
  # または
  npx prisma generate --schema schema.prisma
  ```

- マイグレーション（開発用）

  ```sh
  cd packages/prisma
  yarn migrate:dev
  # または
  npx prisma migrate dev --schema schema.prisma
  ```

- Prisma Studio の起動

  ```sh
  cd packages/prisma
  yarn studio
  ```

---

### UI 設定パッケージ（`packages/ui-config`）

- ビルド（現状はビルド不要なのでダミー）

  ```sh
  yarn workspace @terios/ui-config build
  ```

  `@terios/ui-config` は TypeScript のソースをそのまま各アプリから参照しており、
  ビルド成果物は生成していません（`main` / `types` は `src/index.ts` を指しています）。

  ---

## 7. フロントエンドのローカル起動（開発モード）

開発時にホットリロード付きでフロントエンドを動かす手順です。

1. 依存関係インストール（まだの場合）

   ```sh
   yarn install
   ```

2. 開発サーバー起動（モノレポ経由）

   ```sh
   yarn dev
   ```

   - `turbo run dev` が実行され、[`apps/frontend`](apps/frontend) の Next.js 開発サーバが立ち上がります。
   - デフォルトで `http://localhost:3000` でアクセスできます。

3. 直接 `apps/frontend` に移動して起動したい場合

   ```sh
   cd apps/frontend
   yarn dev
   ```

---

## 8. Prisma 関連のコマンド

Prisma のスキーマやマイグレーションを扱う場合は、`packages/prisma` ワークスペースを利用します。

### 8-1. クライアントの生成

スキーマから Prisma Client を生成します。

```sh
cd packages/prisma
yarn generate
# または
npx prisma generate --schema schema.prisma
```

生成物は [`packages/prisma/generated`](packages/prisma/generated) に出力されます（`.gitignore` 済み）。

### 8-2. マイグレーション（開発用）

```sh
cd packages/prisma
yarn migrate:dev
# もしくは
npx prisma migrate dev --schema schema.prisma
```

### 8-3. Prisma Studio の起動

```sh
cd packages/prisma
yarn studio
# ブラウザで Prisma Studio が開きます
```

> Docker で `prisma` サービスを起動している場合は、`docker compose up prisma` でも Studio を使えます。

---

## 9. よくあるトラブルと対処

- **`Prisma only supports Node.js versions 20.19+ ...` のエラー**
  - Node.js のバージョンが 18 系などの場合に発生します。
  - Node 20 系へアップデートし、再度 `corepack enable` と `yarn install` を実行してください。

- **`Couldn't find the node_modules state file` のエラー（Docker ビルド時）**
  - Yarn 4 の `node-modules` linker 前提で `yarn install` が正しく実行されていない場合に発生します。
  - Dockerfile では必ず
    - ルート `package.json` / `yarn.lock` / `.yarnrc.yml` / `.yarn/**`
    - すべてのワークスペースの `package.json`
    をコピーした後に `yarn install` を実行してください（現行の Dockerfile はその形になっています）。

---

## 10. まとめ

1. Node 20 / Docker Desktop / Git をインストール
2. リポジトリをクローンして `cd terios`
3. `corepack enable` → `corepack prepare yarn@4.11.0 --activate`
4. `yarn install`
5. `.env` に `DATABASE_URL` を設定
6. DB や Prisma を Docker で動かす場合は `docker compose up -d`
7. アプリ開発は `yarn dev`（または `cd apps/frontend && yarn dev`）

この手順に従えば、新しく開発を始める人でもローカル環境を構築できるようになっています。

