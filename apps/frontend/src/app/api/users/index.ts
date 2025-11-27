import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // ユーザー作成
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "パスワードが必要です。" });
    }

    try {
      // パスワードをハッシュ化
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "ユーザー作成に失敗しました。" });
    }
  } else if (req.method === "GET") {
    // ユーザー一覧取得
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "ユーザー一覧の取得に失敗しました。" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}