import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const config = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await (prisma as any).user.findUnique({
          where: { email: String(credentials.email) },
        });
        if (!user) return null;
        const passwordMatch = await bcrypt.compare(
          String(credentials.password),
          user.password
        );
        if (!passwordMatch) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
};

const { handlers, auth, signIn, signOut } = NextAuth(config);
export { handlers, auth, signIn, signOut };