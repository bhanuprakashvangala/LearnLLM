# Authentication Setup Guide for LearnLLM

This guide will help you set up complete authentication with social login (Google, GitHub, Facebook, Twitter) and email/password.

## 🚀 Quick Start

### 1. Install Required Dependencies

```bash
npm install next-auth @auth/prisma-adapter
npm install prisma @prisma/client
npm install bcryptjs
npm install @types/bcryptjs --save-dev
```

### 2. Database Setup

We recommend **PostgreSQL** for production. You can use:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (easiest for Vercel deployments)
- [Supabase](https://supabase.com) (free tier available)
- [Railway](https://railway.app) (PostgreSQL hosting)
- [Neon](https://neon.tech) (serverless PostgreSQL)

#### Initialize Prisma

```bash
npx prisma init
```

#### Configure Database

1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL` with your database connection string

#### Run Migrations

```bash
# Create and apply migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 3. Set Up OAuth Providers

You need to create OAuth applications for each social login provider you want to support.

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Click "Create Credentials" → "OAuth Client ID"
4. Select "Web application"
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy **Client ID** and **Client Secret** to `.env`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: LearnLLM
   - Homepage URL: `http://localhost:3000` (dev) or your domain
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy **Client ID** and **Client Secret** to `.env`

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/apps)
2. Click "Create App" → "Consumer" → "Next"
3. Add "Facebook Login" product
4. In Settings → Basic:
   - Copy **App ID** → `FACEBOOK_CLIENT_ID`
   - Copy **App Secret** → `FACEBOOK_CLIENT_SECRET`
5. In Facebook Login → Settings:
   - Add Valid OAuth Redirect URIs: `http://localhost:3000/api/auth/callback/facebook`

#### Twitter OAuth

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app
3. In "User authentication settings":
   - Enable OAuth 2.0
   - Type: Web App
   - Callback URL: `http://localhost:3000/api/auth/callback/twitter`
4. Copy **Client ID** and **Client Secret** to `.env`

### 4. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET` in `.env`

### 5. Update NextAuth Route Handler

Replace `app/api/auth/[...nextauth]/route.ts` with the implementation code (see comments in that file).

### 6. Create Prisma Client

Create `lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 7. Update Auth Pages

The signup and login pages are already created and styled. They just need to connect to NextAuth:

In `app/(auth)/signup/page.tsx` and `app/(auth)/login/page.tsx`, update the social login handlers:

```typescript
const handleSocialSignup = async (provider: string) => {
  await signIn(provider, { callbackUrl: "/dashboard" });
};
```

## 📊 Database Schema Overview

The Prisma schema includes:

### NextAuth Required Models
- `User` - User accounts
- `Account` - OAuth accounts linked to users
- `Session` - Active sessions
- `VerificationToken` - Email verification

### LearnLLM Custom Models
- `UserProgress` - Track lesson completion and progress
- `ChallengeCompletion` - Track coding challenge completions
- `PlaygroundSave` - Save AI playground experiments

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It contains secrets
2. **Use strong secrets** - Generate with `openssl rand -base64 32`
3. **Enable HTTPS in production** - Required for OAuth
4. **Validate email addresses** - Use email verification
5. **Hash passwords** - Use bcrypt (already configured)
6. **Rate limit auth endpoints** - Prevent brute force attacks

## 🚢 Deployment Checklist

- [ ] Database created and migrated
- [ ] All OAuth apps configured with production URLs
- [ ] Environment variables set in hosting platform
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `NEXTAUTH_SECRET` generated and set
- [ ] SSL/HTTPS enabled
- [ ] Email provider configured (if using email auth)

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OAuth 2.0 Guide](https://oauth.net/2/)

## ⚡ Alternative: Use Clerk or Supabase Auth

If you want a faster setup without managing OAuth yourself:

### Option A: Clerk
```bash
npm install @clerk/nextjs
```
- Managed authentication service
- Built-in UI components
- Free tier: 5,000 MAU

### Option B: Supabase Auth
```bash
npm install @supabase/supabase-js
```
- Built into Supabase (if using Supabase database)
- Includes social providers
- Free tier available

Both options provide drop-in authentication with minimal configuration!
