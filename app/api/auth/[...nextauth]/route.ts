import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth - create or update user in database
      if (account?.provider === "google" && profile) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create new user from Google profile
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || profile.name,
                image: user.image || (profile as any).picture,
                emailVerified: new Date(),
              },
            });
          } else {
            // Update existing user with latest Google info
            // Also set emailVerified if user signed up with email but now uses Google
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                name: user.name || profile.name || existingUser.name,
                image: user.image || (profile as any).picture || existingUser.image,
                emailVerified: existingUser.emailVerified || new Date(),
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving Google user:", error);
          // Still allow sign-in even if database update fails
          // User data just won't be synced
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      try {
        // For Google OAuth, get user from database
        if (account?.provider === "google" && profile) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email! },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.picture = dbUser.image;
            token.plan = dbUser.plan;
            token.role = dbUser.role;
          }
        }
        // For credentials, fetch plan and role
        if (token.email && !token.plan) {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
          });
          if (dbUser) {
            token.plan = dbUser.plan;
            token.role = dbUser.role;
          }
        }
      } catch (error) {
        console.error("Error in JWT callback:", error);
        // Continue without database data - user can still sign in
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string || token.sub!;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.plan = token.plan as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
