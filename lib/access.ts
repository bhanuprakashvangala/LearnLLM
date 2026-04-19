// Access control utilities for content gating

export type Plan = "FREE" | "PRO" | "TEAMS";
export type Role = "USER" | "EMPLOYEE" | "ADMIN";
export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

// The first lesson that's free for everyone (no login required)
export const FREE_LESSON_SLUG = "what-is-llm";

interface UserAccess {
  plan: Plan;
  role: Role;
}

// Everything on LearnLLM.dev is free. Paid tiers have been removed.
// These helpers still exist for call-sites that haven't been updated yet.

export function hasProAccess(user: UserAccess | null): boolean {
  return user !== null;
}

export function isLoggedIn(user: UserAccess | null): boolean {
  return user !== null;
}

export function isFreeLessonSlug(slug: string): boolean {
  return slug === FREE_LESSON_SLUG;
}

// Every lesson is free. The only gate is signing in (so progress can be tracked);
// the first beginner lesson is open to anonymous visitors as a preview.
export function canAccessDifficulty(user: UserAccess | null, _difficulty: Difficulty, slug?: string): boolean {
  if (slug && isFreeLessonSlug(slug)) return true;
  return isLoggedIn(user);
}

export function canAccessChallenges(_user: UserAccess | null): boolean {
  return true;
}

export function canSavePlayground(user: UserAccess | null): boolean {
  return user !== null;
}

// Check if user is admin
export function isAdmin(user: UserAccess | null): boolean {
  if (!user) return false;
  return user.role === "ADMIN";
}

// Check if user is employee or admin
export function isStaff(user: UserAccess | null): boolean {
  if (!user) return false;
  return user.role === "ADMIN" || user.role === "EMPLOYEE";
}

// Kept as a no-op for any legacy call-sites. Every lesson is free.
export function getUpgradeMessage(_difficulty: Difficulty): string {
  return "";
}
