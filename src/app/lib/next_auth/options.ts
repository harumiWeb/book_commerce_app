import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../prisma";

export const nextAuthOptions = {
  debug: false,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // 以下の行を追加
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: '/',
  },
  callbacks: {
    session : async ({session , user}:{session : any, user : any}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        }
      }
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return baseUrl;
    },
  },
};

export const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };