import NextAuth, { NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Session {
  user: {
    id?: string | null | undefined;
  };
}

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

      try {
        let db_user = await prisma.user.findUnique({
          where: { email: user.email || "" },
        });

        if (!db_user) {
          db_user = await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
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
