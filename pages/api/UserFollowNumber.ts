// pages/api/UserFollowNumber.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId } = req.body;

      const followerCount = await prisma.follow.count({
        where: {
          follow_id: userId as string,
        },
      });

      const followingCount = await prisma.follow.count({
        where: {
          following_id: userId as string,
        },
      });

      return res.status(200).json({
        followerCount,
        followingCount,
      });
    } catch (err) {
      console.error("데이터를 불러오는 중 오류 발생:", err);
      return res.status(500).json({ error: "서버 오류" });
    }
  } else {
    return res.status(405).json({ error: "잘못된 HTTP 메소드" });
  }
}
