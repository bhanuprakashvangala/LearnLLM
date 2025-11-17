# 🔐 Setting Up Authentication for LearnLLM

## ✅ What I've Created For You

I've set up a complete authentication system with:

1. **Beautiful UI Pages**
   - ✅ Login page (`/login`)
   - ✅ Signup page (`/signup`)
   - ✅ Social login buttons (Google, GitHub, Facebook, Twitter)
   - ✅ Email/password forms
   - ✅ Professional design with animations

2. **Database Schema** (`prisma/schema.prisma`)
   - User accounts and profiles
   - Social OAuth accounts
   - Sessions management
   - User progress tracking
   - Challenge completions
   - Playground saves

3. **Configuration Files**
   - `.env.example` - Template for environment variables
   - `lib/auth.ts` - Auth configuration
   - `app/api/auth/[...nextauth]/route.ts` - API routes
   - `AUTHENTICATION_SETUP.md` - Detailed setup guide

## 🚨 Current Status: NEEDS CONFIGURATION

**The social login buttons currently show an alert** because OAuth providers need to be set up. Here's what you need to do:

## 📋 Quick Setup Checklist

### Step 1: Choose Your Path

You have **3 options** for authentication:

#### Option A: Full NextAuth.js Setup (Most Control) ⭐ Recommended
- **Pros**: Complete control, free, no monthly fees
- **Cons**: Requires OAuth setup for each provider (30-60 mins)
- **Best for**: Production apps, learning, full customization

#### Option B: Use Clerk (Fastest) ⚡
- **Pros**: Setup in 5 minutes, managed service, beautiful UI
- **Cons**: Costs money after 5,000 users
- **Best for**: Quick MVP, startups, don't want to manage OAuth

#### Option C: Use Supabase Auth (Good Middle Ground)
- **Pros**: Free tier, includes database, easy setup
- **Cons**: Tied to Supabase ecosystem
- **Best for**: If you're already using Supabase

---

## 🔧 OPTION A: NextAuth.js Setup (Recommended)

### 1. Install Dependencies

```bash
npm install next-auth @auth/prisma-adapter prisma @prisma/client bcryptjs
npm install @types/bcryptjs --save-dev
```

### 2. Set Up Database

**Choose a database provider:**

I recommend **Vercel Postgres** (if deploying to Vercel) or **Supabase** (free tier):

**For Vercel Postgres:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and create database
vercel link
vercel storage create postgres
```

**For Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database

**For local development (SQLite):**
- Already configured in `prisma/schema.prisma`
- Just change provider to `sqlite` and set `DATABASE_URL="file:./dev.db"`

### 3. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env
```

Edit `.env` and add:

```env
DATABASE_URL="your-database-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run-this-command: openssl rand -base64 32"
```

Generate the secret:
```bash
openssl rand -base64 32
```

### 4. Initialize Database

```bash
# Initialize Prisma
npx prisma init

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 5. Set Up OAuth Providers

**You only need to set up the providers you want to use!**

#### Google OAuth (Most Popular)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create new project → "LearnLLM"
3. Enable "Google+ API"
4. Create credentials → OAuth Client ID → Web Application
5. Add authorized redirect URI:
   - Dev: `http://localhost:3000/api/auth/callback/google`
   - Prod: `https://your-domain.com/api/auth/callback/google`
6. Copy **Client ID** and **Client Secret** to `.env`:

```env
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

#### GitHub OAuth (Easy)

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. New OAuth App
3. Fill in:
   - Name: LearnLLM
   - Homepage: `http://localhost:3000`
   - Callback: `http://localhost:3000/api/auth/callback/github`
4. Copy credentials to `.env`:

```env
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

#### Facebook & Twitter (Optional)

See detailed instructions in `AUTHENTICATION_SETUP.md`

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

### 7. Update NextAuth Route

See the commented code in `app/api/auth/[...nextauth]/route.ts` - uncomment and implement it.

### 8. Update Login/Signup Pages

In `app/(auth)/login/page.tsx` and `app/(auth)/signup/page.tsx`, replace the alert handler with:

```typescript
import { signIn } from "next-auth/react"

const handleSocialLogin = async (provider: string) => {
  await signIn(provider, { callbackUrl: "/dashboard" });
};
```

### 9. Test It!

```bash
npm run dev
```

Visit `http://localhost:3000/signup` and try social login!

---

## ⚡ OPTION B: Quick Setup with Clerk

**Fastest way to get authentication working:**

### 1. Install Clerk

```bash
npm install @clerk/nextjs
```

### 2. Get API Keys

1. Go to [clerk.com](https://clerk.com)
2. Create account and application
3. Copy your keys

### 3. Add to `.env`

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

### 4. Wrap Your App

In `app/layout.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### 5. Update Auth Pages

Replace your custom login/signup pages with Clerk's:

```typescript
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return <SignIn />;
}
```

**Done!** Clerk handles everything else.

---

## 🗄️ Database: Do You Need One?

**YES**, you need a database to store:
- User accounts and profiles
- Social OAuth connections
- User progress in lessons
- Challenge completions
- Playground saves
- Subscription/payment info

**Recommended Free Options:**
1. **Vercel Postgres** - Best if deploying to Vercel
2. **Supabase** - 500MB free, includes auth
3. **Railway** - $5 credit, easy PostgreSQL
4. **PlanetScale** - MySQL, free tier
5. **SQLite** - For local development only

---

## 🎯 What Happens When Users Click Social Login?

### Current Behavior:
- Shows alert with setup instructions
- Tells users to use email signup instead

### After Setup:
1. User clicks "Continue with Google"
2. Redirects to Google OAuth consent screen
3. User approves access
4. Google redirects back with auth token
5. NextAuth creates user account in database
6. User is logged in and redirected to `/dashboard`
7. Future logins are instant (already has account)

---

## 📊 Database Schema Explained

Your Prisma schema includes:

```typescript
User {
  id, email, name, image          // Basic info
  emailVerified                    // Email confirmation
  hashedPassword                   // For email/password auth
  plan                            // FREE, PRO, or TEAMS
  accounts[]                      // Connected OAuth accounts
  progress[]                      // Lesson progress
  challenges[]                    // Challenge completions
  playgrounds[]                   // Saved experiments
}
```

---

## 🚀 Deployment Checklist

When you deploy to production:

- [ ] Set `NEXTAUTH_URL` to your domain (e.g., `https://learnllm.dev`)
- [ ] Update OAuth redirect URIs to production URLs
- [ ] Set strong `NEXTAUTH_SECRET` (different from dev)
- [ ] Use production database (not SQLite)
- [ ] Enable HTTPS (required for OAuth)
- [ ] Test all social login providers
- [ ] Set up email verification (optional but recommended)

---

## 🆘 Need Help?

Check these resources:
- `AUTHENTICATION_SETUP.md` - Detailed setup guide
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Clerk Docs](https://clerk.com/docs) (if using Clerk)

---

## 💡 Quick Decision Guide

**Choose NextAuth.js if:**
- ✅ You want to learn how OAuth works
- ✅ You want complete control
- ✅ You don't want monthly fees
- ✅ You have 30-60 minutes for setup

**Choose Clerk if:**
- ✅ You want to launch ASAP (5 min setup)
- ✅ You don't mind monthly cost ($25+)
- ✅ You want beautiful pre-built UI
- ✅ You want built-in user management

**Choose Supabase Auth if:**
- ✅ You're already using Supabase
- ✅ You want auth + database together
- ✅ You want generous free tier
