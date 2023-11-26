import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { senderUserId, receiverUserId, message, roomId } = req.body;

    // 1. 채팅 메시지를 Prisma를 사용하여 생성하고 Room과의 관계를 설정합니다.
    const chat = await prisma.chat.create({
      data: {
        senderId: senderUserId as string,
        receiverId: receiverUserId as string,
        message: message as string,
        roomId: roomId,
      },
    });

    // 2. Pusher를 사용하여 실시간으로 메시지를 전송합니다.
    const pusher = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET as string,
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      useTLS: true,
    });

    await pusher.trigger("chat", "hello", { message: chat });

    return res.status(200).json(chat);
  } else {
    return res.status(405).end(); // POST 메서드만 허용합니다.
  }
}
