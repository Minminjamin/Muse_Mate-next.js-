import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.body;

    const chatRooms = await prisma.room.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    return res.status(200).json({ chatRooms });
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
