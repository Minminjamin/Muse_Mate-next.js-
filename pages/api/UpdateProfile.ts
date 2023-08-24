import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    try {
      const { id, name, profileImg } = req.body;

      const session = await getSession({ req });

      if (!session?.user) {
        return res.redirect("/Login/Login");
      }

      const userEmail: string | null = session?.user.email || "";
      const userId: string = id;

      const user = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          id: userId,
          name: name as string,
          profile_img: profileImg as string,
        },
      });

      // const userId = await prisma.user.update({
      //   where: {
      //     email: userEmail,
      //   },
      //   data: {
      //     id: id as string,
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  }

  // req.statusCode = 200
}
