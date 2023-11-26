import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { user1Id, user2Id } = req.body;

    if (!user1Id || !user2Id) {
      return res.status(400).json({ error: "유효하지 않은 사용자 ID" });
    }

    const existingRoom = await prisma.room.findMany({
      where: {
        OR: [
          { user1Id: user1Id, user2Id: user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });

    return res.status(200).json({ isChat: existingRoom });
  } catch (error) {
    console.error("Error creating chat room:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
