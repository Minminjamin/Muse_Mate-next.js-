import { NextApiRequest, NextApiResponse } from "next";
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
      return res.status(400).json({ error: "Invalid user IDs" });
    }

    const existingRoom = await prisma.room.findFirst({
      where: {
        OR: [
          { user1Id: user1Id, user2Id: user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });

    if (existingRoom) {
      return res
        .status(200)
        .json({ roomId: existingRoom.id, isChat: existingRoom });
    } else {
      const newRoom = await prisma.room.create({
        data: {
          user1Id,
          user2Id,
        },
      });

      return res.status(200).json({ roomId: newRoom.id, isChat: false });
    }
  } catch (error) {
    console.error("Error creating/checking chat room:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
