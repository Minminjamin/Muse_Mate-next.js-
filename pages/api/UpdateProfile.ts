import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user_id, name, id, profile_img } = req.body;

    // if (profile_img != null) {
    //   const publicId = (img_url: string) => {
    //     const parts = img_url.split("/");
    //     // 경로에서 뒤에서 두 번째 부분이 "public_id" 입니다.
    //     const publicId = parts[parts.length - 2];
    //     return publicId;
    //   };
    //   await cloudinary.uploader.destroy(publicId(profile_img as string));
    // }

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
