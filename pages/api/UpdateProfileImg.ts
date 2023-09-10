import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
// import { IncomingForm } from "formidable";

//
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

    res.status(200).json({ secure_url: data.secure_url });
  } catch (error) {
    console.log(error);
  }
}
