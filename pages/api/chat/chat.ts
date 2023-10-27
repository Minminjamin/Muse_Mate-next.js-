import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, sender } = req.body;
  const response = await pusher.trigger("chat", "chat-event", {
    message: message as string,
  });

  return res.json(response);
}
