import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import {
  isLoginBlocked,
  registerLoginFailure,
  registerLoginSuccess,
} from "@/lib/auth/rate-limit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        if (isLoginBlocked(email)) {
          return null;
        }

        const db = getDb();
        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user) {
          registerLoginFailure(email);
          return null;
        }

        const valid = await bcrypt.compare(password, user.hashedPassword);

        if (!valid) {
          registerLoginFailure(email);
          return null;
        }

        registerLoginSuccess(email);
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
