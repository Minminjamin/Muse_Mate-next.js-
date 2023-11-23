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

  // const session = await getSession();

  // if (!session) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  try {
    const { user1Id, user2Id } = req.body;

    const existingRoom = await prisma.room.findFirst({
      where: {
        AND: [
          {
            OR: [
              { user1Id, user2Id },
              { user1Id: user2Id, user2Id: user1Id },
            ],
          },
          { messages: { some: {} } },
        ],
      },
    });

    if (existingRoom) {
      return res.status(200).json({ roomId: existingRoom.id });
    }

    const newRoom = await prisma.room.create({
      data: {
        user1Id,
        user2Id,
      },
    });

    return res.status(200).json({ roomId: newRoom.id });
  } catch (error) {
    console.error("Error creating chat room:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
