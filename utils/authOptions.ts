import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connectDb";
import { SessionInterface } from "@/common.types";
import { randomBytes, randomUUID } from "crypto";

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
