/**
 * Authentication Configuration for LearnLLM
 *
 * This file sets up authentication using NextAuth.js
 * Supports: Google, GitHub, Facebook, Twitter, and Email/Password
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Install dependencies:
 *    npm install next-auth @auth/prisma-adapter
 *    npm install prisma @prisma/client
 *    npm install bcryptjs
 *    npm install @types/bcryptjs --save-dev
 *
 * 2. Set up your database (using Prisma):
 *    npx prisma init
 *
 * 3. Create OAuth applications:
 *    - Google: https://console.cloud.google.com/apis/credentials
 *    - GitHub: https://github.com/settings/developers
 *    - Facebook: https://developers.facebook.com/apps
 *    - Twitter: https://developer.twitter.com/en/portal/dashboard
 *
 * 4. Add environment variables to .env:
 *    DATABASE_URL="your-database-url"
 *    NEXTAUTH_URL="http://localhost:3000"
 *    NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
 *
 *    GOOGLE_CLIENT_ID="your-google-client-id"
 *    GOOGLE_CLIENT_SECRET="your-google-client-secret"
 *
 *    GITHUB_CLIENT_ID="your-github-client-id"
 *    GITHUB_CLIENT_SECRET="your-github-client-secret"
 *
 *    FACEBOOK_CLIENT_ID="your-facebook-app-id"
 *    FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"
 *
 *    TWITTER_CLIENT_ID="your-twitter-client-id"
 *    TWITTER_CLIENT_SECRET="your-twitter-client-secret"
 */

// Placeholder configuration - will be implemented with NextAuth.js
export const authConfig = {
  providers: {
    google: {
      enabled: process.env.GOOGLE_CLIENT_ID ? true : false,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      enabled: process.env.GITHUB_CLIENT_ID ? true : false,
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    facebook: {
      enabled: process.env.FACEBOOK_CLIENT_ID ? true : false,
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    },
    twitter: {
      enabled: process.env.TWITTER_CLIENT_ID ? true : false,
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    },
  },
};

// Type definitions
export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  expires: string;
}
