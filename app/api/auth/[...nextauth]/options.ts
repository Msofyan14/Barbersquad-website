import { authenticate } from "@/lib/actions/users.actions";
import { FormLoginValidation } from "@/lib/validations/types";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const parsedCredentials = FormLoginValidation.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const login = await authenticate(email, password);
          if (!login) {
            throw new Error("Invalid Credentials Login");
          }
          return login;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;

      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
