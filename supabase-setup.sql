-- LearnLLM Database Schema
-- Run this in Supabase SQL Editor to create all necessary tables

-- Create enums
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'TEAMS');
CREATE TYPE "Difficulty" AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create User table
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP,
    "image" TEXT,
    "hashedPassword" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "stripeCustomerId" TEXT UNIQUE,
    "stripeSubscriptionId" TEXT UNIQUE,
    "stripePriceId" TEXT,
    "stripeCurrentPeriodEnd" TIMESTAMP
);

-- Create Account table (for OAuth)
CREATE TABLE "Account" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

-- Create Session table
CREATE TABLE "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create VerificationToken table
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT UNIQUE NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token")
);

-- Create UserProgress table (lesson tracking)
CREATE TABLE "UserProgress" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "lessonSlug" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT FALSE,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "lastViewed" TIMESTAMP NOT NULL DEFAULT NOW(),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "UserProgress_userId_lessonSlug_key" UNIQUE ("userId", "lessonSlug")
);

-- Create ChallengeCompletion table
CREATE TABLE "ChallengeCompletion" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT FALSE,
    "points" INTEGER NOT NULL DEFAULT 0,
    "solutionCode" TEXT,
    "completedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "ChallengeCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "ChallengeCompletion_userId_challengeId_key" UNIQUE ("userId", "challengeId")
);

-- Create PlaygroundSave table
CREATE TABLE "PlaygroundSave" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "model" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    "maxTokens" INTEGER NOT NULL DEFAULT 1000,
    "response" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "PlaygroundSave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX "Account_userId_idx" ON "Account"("userId");
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
CREATE INDEX "UserProgress_userId_idx" ON "UserProgress"("userId");
CREATE INDEX "UserProgress_lessonSlug_idx" ON "UserProgress"("lessonSlug");
CREATE INDEX "ChallengeCompletion_userId_idx" ON "ChallengeCompletion"("userId");
CREATE INDEX "PlaygroundSave_userId_idx" ON "PlaygroundSave"("userId");

-- Create trigger to auto-update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_userprogress_updated_at BEFORE UPDATE ON "UserProgress"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playgroundsave_updated_at BEFORE UPDATE ON "PlaygroundSave"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ All tables created successfully!';
    RAISE NOTICE '✅ Your LearnLLM database is ready!';
END $$;
