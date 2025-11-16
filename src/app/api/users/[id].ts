import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    // ユーザー取得
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        return res.status(404).json({ error: "ユーザーが見つかりません。" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "ユーザー取得に失敗しました。" });
    }
  } else if (req.method === "PUT") {
    // ユーザー更新
    const { name, email, password } = req.body;

    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          ...(hashedPassword && { password: hashedPassword }),
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "ユーザー更新に失敗しました。" });
    }
  } else if (req.method === "DELETE") {
    // ユーザー削除
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "ユーザー削除に失敗しました。" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}