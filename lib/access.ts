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

// Check if user has PRO access (Admin, Employee, or paid plan)
export function hasProAccess(user: UserAccess | null): boolean {
  if (!user) return false;

  // Admins and employees always have full access
  if (user.role === "ADMIN" || user.role === "EMPLOYEE") {
    return true;
  }

  // Pro and Teams plans have full access
  if (user.plan === "PRO" || user.plan === "TEAMS") {
    return true;
  }

  return false;
}

// Check if user is logged in (any plan)
export function isLoggedIn(user: UserAccess | null): boolean {
  return user !== null;
}

// Check if a specific lesson is the free preview lesson
export function isFreeLessonSlug(slug: string): boolean {
  return slug === FREE_LESSON_SLUG;
}

// Check if user can access specific difficulty level
export function canAccessDifficulty(user: UserAccess | null, difficulty: Difficulty, slug?: string): boolean {
  // The first beginner lesson is always free for everyone
  if (slug && isFreeLessonSlug(slug)) {
    return true;
  }

  // Advanced requires PRO plan
  if (difficulty === "ADVANCED") {
    return hasProAccess(user);
  }

  // Beginner and Intermediate require login (any plan)
  return isLoggedIn(user);
}

// Check if user can access challenges
export function canAccessChallenges(user: UserAccess | null): boolean {
  // Basic challenges are free, but we can gate specific ones later
  return true;
}

// Check if user can save playground experiments
export function canSavePlayground(user: UserAccess | null): boolean {
  return hasFullAccess(user);
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

// Get content access message for upgrade prompts
export function getUpgradeMessage(difficulty: Difficulty): string {
  return `Upgrade to Pro to access ${difficulty.toLowerCase()} content and unlock all lessons.`;
}
