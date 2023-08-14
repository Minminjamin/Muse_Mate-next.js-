import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
// import v4 from "uuid"

// https://cloudinary.com/documentation/node_integration#node_js_sdk_features
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: "musemate",
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET_KEY,
  secure: true,
});
// https://velog.io/@gonggi_bab/Next-Auth-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8
// https://medium.com/prisma-korea/%EC%8B%A4%EC%9A%A9%EC%A0%81%EC%9D%B8-prisma-%EC%98%88%EC%A0%9C-5ad2bd13768f

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile) {
        // user.name = profile.response?.name || user.name;
        // user.email = profile.response?.email || user.email
        user.name = profile.name || user.name;
        user.email = profile.email || user.email;
      }

      // 고유한 값으로 단일 사용자 레코드를 검색
      try {
        let db_user = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        const basicProfileImg = require("../../../public/basic img.jpg");
        // 새로운 User 레코드를 생성하는 쿼리 작성
        if (!db_user) {
          const uuid = v4();

          db_user = await prisma.user.create({
            data: {
              id: uuid,
              name: user.name!,
              email: user.email!,
              profile_img: "",

              // cart: {
              //   create: {
              //     profile: user.profile!,
              //     id :  user.id!
              //   },
              // },
              // role = 'user',
            },
          });
        }

        const imgData = cloudinary.uploader.upload(basicProfileImg);
        const imgDataUrl = (await imgData).url;

        db_user = await prisma.user.update({
          where: { email: user.email || "" },
          data: { profile_img: imgDataUrl },
        });

        user.id = db_user.id;
        // user.role = db_user.role;

        return true;
      } catch (error) {
        console.log("로그인 도중 에러가 발생했습니다.", error);

        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // session.user.id = token.id as string;
        const session_user: any = session.user;
        session_user.id = token.id as string;
        // session.user.role = token.role as string;
      }

      return session;
    },
  },

  secret: process.env.NEXT_PUBLICK_NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
