import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

// import { IncomingForm } from "formidable";
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// https://github.com/cloudinary-community/cloudinary-examples/tree/main/examples/nextjs-upload-formdata
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });

    if (!session?.user) {
      return res.status(401).json({ error: "인증에 실패하셨습니다." });
    }

    const userEmail: string | null = session?.user.email || "";

    // const oldProfileImg = session?.user.image

    const file: any = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
      });
      form.on("file", (formName, file) => {
        resolve(file);
      });
    });

    const data = await cloudinary.uploader.upload(file.filepath);
    // await
    const user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        profile_img: data.secure_url,
      },
    });

    // const imgUrl = imgUpload.secure_url;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
