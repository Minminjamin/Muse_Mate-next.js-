import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user_id, name, id } = req.body;

  // const session = await getSession({ req });

  // if (!session?.user) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  try {
    // const userEmail: string | null = session?.user.email || "";

    const user = await prisma.user.update({
      where: {
        id: id,
        // email: userEmail,
      },
      data: {
        user_id: user_id,
        name: name,
        // profile_img: profileImg,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
