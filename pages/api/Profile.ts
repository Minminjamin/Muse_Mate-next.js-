import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

// prisma 문제로 인해 api 작업을 별도로 진행함
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (!session?.user) {
      return res.status(401).json({ error: "인증에 실패하셨습니다." });
    }

    const userEmail: string | null = session?.user.email || "";
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile_img: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
}
