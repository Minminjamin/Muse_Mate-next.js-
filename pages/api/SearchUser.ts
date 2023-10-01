import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.body;

    const user = await prisma.user.findMany({
      where: {
        user_id: userId,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
