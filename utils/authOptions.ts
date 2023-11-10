import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connectDb";
import { AdapterUser } from "next-auth/adapters";
import { SessionInterface } from "@/common.types";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  theme: {
    colorScheme: "dark",
    logo: "/logo.png",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   console.log(`user: ${user}`);
    //   console.log(`token: ${token}`);
    //   return { ...token, ...user };
    // },
    async session({ session, token }) {
      try {
        const currentUserEmail = session?.user?.email;
        const userObject = await prisma.user.findUnique({
          where: { email: currentUserEmail! },
          include: { projects: true },
        });
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...userObject,
          },
        };
        return newSession;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}

export default authOptions;
