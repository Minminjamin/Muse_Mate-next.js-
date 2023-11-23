import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, followId } = req.body;

    const unFollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followingId: userId as string,
          followerId: followId as string,
        },
      },
    });

    res.status(200).json(unFollow);
  } catch (error) {
    console.log(error);
  }
}
