import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, followId } = req.body;
    const isFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followingId: userId as string,
          // user_id: userId,
          followerId: followId,
        },
      },
    });

    if (isFollow) {
      res.status(200).json({ isFollow: true });
    } else {
      res.status(200).json({ isFollow: false });
    }
  } catch (error) {
    console.log(error);
  }
}
