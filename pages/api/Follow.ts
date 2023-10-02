import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId, followId } = req.body;

    const follow = await prisma.follow.create({
      data: {
        user_id: userId as string,
        follow_id: followId as string,
        following_id: userId as string,
      },
    });

    res.status(200).json(follow);
  } catch (error) {
    console.log(error);
  }
}
