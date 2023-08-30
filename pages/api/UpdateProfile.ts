import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id, name, id } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        user_id: user_id,
        name: name,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
