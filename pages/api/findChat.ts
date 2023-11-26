import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { senderUserId, receiverUserId, message } = req.body;

  const chatData = await prisma.chat.findMany({
    select: {
      message: true,
      senderId: true,
      receiverId: true,
    },
    where: {
      senderId: senderUserId as string,
      receiverId: receiverUserId as string,
    },
  });

  res.status(200).json(chatData);
}
