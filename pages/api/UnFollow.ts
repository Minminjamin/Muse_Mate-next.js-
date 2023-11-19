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
        follow_id_following_id: {
          following_id: userId as string,
          follow_id: followId as string,
        },
      },
    });

    res.status(200).json(unFollow);
  } catch (error) {
    console.log(error);
  }
}
