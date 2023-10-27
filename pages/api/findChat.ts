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
      sender_user_id: true,
      receiver_user_id: true,
    },
    where: {
      sender_user_id: senderUserId as string,
      receiver_user_id: receiverUserId as string,
    },
  });

  res.status(200).json(chatData);
}
