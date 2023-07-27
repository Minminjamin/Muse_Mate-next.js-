import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";

if (!process.env.NEXT_PUBLIC_MONGO_URI) throw new Error("env error");
const uri: string = process.env.NEXT_PUBLIC_MONGO_URI;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, ...restInfo } = req.body;

    const client = await MongoClient.connect(uri);
    const db = client.db();

    const checkExist = await db.collection("users").findOne({ email });

    if (checkExist) {
      client.close();
      res.status(442).json({ result: false, error: "이미 가입된 계정입니다." });
      return;
    }

    const status = await db.collection("users").insertOne({
      email,
      password: await hash(password, 12),
      ...restInfo,
    });

    res.status(201).json({ result: true, message: "User created", ...status });
    client.close();
  } else {
    res.status(500).json({ result: false, error: "Route not valid" });
  }
}
